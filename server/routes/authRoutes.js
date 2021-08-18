const express = require('express')
const jwt = require('jsonwebtoken');
const passport = require('passport')
const validator = require('validator');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const PasswordChangeRequest = require('../models/PasswordChangeRequest');
const encryption = require('../util/encryption');


const { tokenDecoder } = require('../middleware/auth-check');
const { Ok, Unauthorized, BadRequest } = require('./responses');



const router = new express.Router()

function validateSignupForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide a correct email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
    isFormValid = false
    errors.password = 'Password must have at least 4 characters.'
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false
    errors.name = 'Please provide your name.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function validateLoginForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false
    errors.email = 'Please provide your username address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/register', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(401).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }


  return passport.authenticate('signup', (err) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: err
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {


  if (req.isAuthenticated()) {
    const token = jwt.sign({ userId: req.user._id }, 's0m3 r4nd0m str1ng');

    if (!req.cookies['passport'])
      res.cookie('passport', req.user._id);

    const data = {
      token,
      username: req.user.username,
      isAdmin: req.user.roles.indexOf('Admin') != -1
    }

    return Ok(res, 'You have successfully logged in!', data)
  }

  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(401).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('login', (err, user, token) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong with server'
      })
    }

    if (!user) {
      return Unauthorized(res, 'Invalid username or password');
    }

    req.logIn(user, err => {
      if (err) return res.status(500).json({
        success: false,
        message: 'Something went wrong with server'
      });
    })

    const data = {
      username: user.username,
      isAdmin: user.roles.indexOf('Admin') != -1,
      token
    }

    res.cookie('passport', user._id);

    return Ok(res, 'Successfully logged in', data);

  })(req, res, next)
});

router.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
  }

  res.clearCookie('passport');

  return res.status(200).json({
    success: true,
    message: 'Logged out'
  })
})

router.get('/stat', tokenDecoder, (req, res) => {

  if (!req.user) return Ok(res, 'No user');


  if (!req.cookies['passport'])
    res.cookie('passport', req.user._id);


  const userData = {
    isAdmin: req.user.roles.indexOf('Admin') !== -1,
  }

  return Ok(res, 'Auth cookie is set', userData);

})

router.post('/forgottenPassword', async (req, res) => {

  const email = req.body.email;

  if (!email || typeof email !== 'string' || !validator.isEmail(email)) {
    return BadRequest(res, "Invalid email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return BadRequest(res, "User with this email does not exist");
  }

  const changeRequest = await PasswordChangeRequest.create({ user });

  //emailjs.sendForm('','template_wds40p3',email,'user_CBFjjlI7LoTbxcKH4fLE6');
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" ${testAccount.email}`, // sender address
    to: email, // list of receivers
    subject: "ABS Forgotten password", // Subject line
    text: "You can reset your password here", // plain text body
    html: `<a href=\"http://localhost:3000/forgotten-password/${changeRequest._id}\">Reset</a>`, // html body
  });

  return Ok(res, "User has 10 minutes to change password", nodemailer.getTestMessageUrl(info));


})

router.post('/changePassword/:id', async (req, res) => {

  const request = await PasswordChangeRequest.findById(req.params.id);
  if (!request) {
    return BadRequest(res, 'Request does not exist');
  }
  const user = await User.findById(request.user);

  if (!user) {
    return BadRequest(res, 'User not found');
  }

  const salt = encryption.generateSalt();
  const hashedPassword = encryption.generateHashedPassword(salt, req.body.password);

  user.salt = salt;
  user.hashedPass = hashedPassword;
  user.save();

  return Ok(res, 'Password changed');
});

module.exports = router
