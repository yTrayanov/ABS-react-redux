const cors = require('cors');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const authRoutes = require('../routes/auth');
const flightRoutes = require('../routes/fligthRoutes');
const createRoutes = require('../routes/createRoutes');
const ticketRoutes = require('../routes/ticketRoutes');
const sectionRoutes = require('../routes/sectionRoutes');


const sessionStore = MongoStore.create({mongoUrl:'mongodb://localhost:27017/AirlineBookingSystem'});

module.exports = app => {

  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
  }));
  
  app.use(session({
    secret:'s0m3 r4nd0m str1ng',
    resave:true,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
      maxAge:24*60*60*1000
    }
  }));

  app.use(cookieParser('s0m3 r4nd0m str1ng'));

  app.use(passport.initialize());
  app.use(passport.session());
  require('./passport')(passport);

  
  // routes
  app.use('/auth', authRoutes);
  app.use('/flight' , flightRoutes);
  app.use('/ticket' , ticketRoutes);
  app.use('/section' , sectionRoutes);
  app.use('/create' , createRoutes);
}