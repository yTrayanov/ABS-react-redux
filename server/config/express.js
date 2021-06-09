const cors = require('cors');
const User = require('../models/User');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const localJwtStrategy = require('../passport/local-jwt');
const localSignupStrategy = require('../passport/local-signup');
const localLoginStrategy = require('../passport/local-login');

const authRoutes = require('../routes/auth');
const flightRoutes = require('../routes/fligthRoutes');
const createRoutes = require('../routes/createRoutes');
const ticketRoutes = require('../routes/ticketRoutes');
const sectionRoutes = require('../routes/sectionRoutes');


const sessionStore = MongoStore.create({mongoUrl:'mongodb://localhost:27017/AirlineBookingSystem'});

module.exports = app => {

  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(session({
    secret:'s0m3 r4nd0m str1ng',
    resave:false,
    saveUninitialized:false,
    store:sessionStore,
    cookie:{
      maxAge:1000*60*60*24
    }
  }));
  
  passport.use('local-jwt', localJwtStrategy);
  passport.use('local-signup', localSignupStrategy)
  passport.use('local-login', localLoginStrategy)

  passport.serializeUser(function (user, done) { done(null , user._id)});
  
  passport.deserializeUser(function (id , done){
    User.findById(id , (err , user) => done(err, user));
  })

  app.use(passport.initialize());
  app.use(passport.session());

  
  // routes
  app.use('/auth', authRoutes);
  app.use('/flight' , flightRoutes);
  app.use('/ticket' , ticketRoutes);
  app.use('/section' , sectionRoutes);
  app.use('/create' , createRoutes);
}