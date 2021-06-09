const cors = require('cors');
const User = require('../models/User');
const passport = require('passport');
const express = require('express');
const session = require('express-session');

const localSignupStrategy = require('../passport/local-signup');
const localLoginStrategy = require('../passport/local-login');

const authRoutes = require('../routes/auth');
const flightRoutes = require('../routes/fligthRoutes');
const createRoutes = require('../routes/createRoutes');
const ticketRoutes = require('../routes/ticketRoutes');
const sectionRoutes = require('../routes/sectionRoutes');

module.exports = app => {

  passport.use('local-signup', localSignupStrategy)
  passport.use('local-login', localLoginStrategy)

  passport.serializeUser(function (user, done) { done(null , user._id)});
  
  passport.deserializeUser( async function (id , done){
    await User.findById(id , (err , user) => done(err, user));
  })
  


  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cors());
  app.use(express.json());
  app.use(session({
    secret:'s0m3 r4nd0m str1ng',
    resave:true,
    saveUninitialized:true,
    cookie:{
      maxAge:1000*60*60*24
    }
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  
  // routes
  app.use('/auth', authRoutes);
  app.use('/flight' , flightRoutes);
  app.use('/ticket' , ticketRoutes);
  app.use('/section' , sectionRoutes);
  app.use('/create' , createRoutes);
}