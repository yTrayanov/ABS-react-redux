const express = require('express')
const passport = require('passport')
const validator = require('validator');

const {BadRequest} =require('./responses');

const router = new express.Router()

function validateSignupForm (payload) {
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

function validateLoginForm (payload) {
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


  return passport.authenticate('local-signup', (err) => {
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

  return passport.authenticate('local-login', (err, token, data) => {

    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        console.log('Invalid credentials');
        
        return res.status(401).json({
          success: false,
          message: err.message
        })
      }

      return res.status(401).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    req.logIn(data.user, err => {
      if(err) return BadRequest(res, 'Couldn\'t log in user');
    })

    req.session.user = req.user;
    req.session.save()

    res.cookie('auth',req.session.cookie);
    
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: data.userData,
    })
  })(req, res, next)
})

module.exports = router