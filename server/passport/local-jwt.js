const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

module.exports = new JwtStrategy({
    secretOrKey:'s0m3 r4nd0m str1ng',
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => {
    User.findById(payload.userId , (err , user) =>{
        if(err) return done(err,false);
        if(user) return done(null , user); else return done(null , false);
    })
})