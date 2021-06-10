const express = require('express')
const passport = require('passport')
const validator = require('validator');
const {tokenDecoder} = require('../middleware/auth-check');

const { BadRequest, Ok } = require('./responses');

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
      console.log(err);
      return res.status(401).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    if (!user) {
      return BadRequest(res, 'User not found');
    }

    req.logIn(user, err => {
      if (err) return BadRequest(res, 'Couldn not log in user');
    })
    const data = {
      username: user.username,
      isAdmin: user.roles.indexOf('Admin') != -1,
      userId: user._id,
    }

    res.cookie('passport', user._id);

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: data,
    })
  })(req, res, next)
});

router.post('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
  }

  res.clearCookie('passport');

  return res.status(200).json({
    success: true,
    message: 'Logged out'
  })
})

router.get('/stat' ,(req , res , isLogged) =>{


  return Ok(res , 'Hahaha');
})

module.exports = router
