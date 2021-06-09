const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const encryption = require('../util/encryption');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {

  const salt = encryption.generateSalt();
  const hashedPass = encryption.generateHashedPassword(salt, password);
  User.create({email, hashedPass, salt, username: req.body.username}).then(() => {
    return done(null)
  })
})
