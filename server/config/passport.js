const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const encryption = require('../util/encryption');
const User = require('../models/User');

module.exports = (passport) => {
    passport.use('login',new LocalStrategy((username, password, done) => {

        User.findOne({username:username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false);

            const hashedPassword = encryption.generateHashedPassword(user.salt, password);

            if (user.hashedPass === hashedPassword){
                const token = jwt.sign({userId:user._id}, 's0m3 r4nd0m str1ng');
                return done(null, user, token);
            } 
            else return done(null, false);
        })
    }));

    passport.use('signup' , new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true
      }, (req, email, password, done) => {
      
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, password);
        User.create({email, hashedPass, salt, username: req.body.username}).then(() => {
          return done(null)
        })
      }))

    passport.serializeUser(function (user, done) { console.log('serialize'); done(null, user._id) });

    passport.deserializeUser(function (id, done) {
        console.log('deserialize');
        User.findById(id, (err, user) => done(err, user));
    })
}

