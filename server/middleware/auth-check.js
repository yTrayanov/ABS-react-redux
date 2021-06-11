const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtAuthCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  const token = req.headers.authorization.split(' ')[1]

  return jwt.verify(token, 's0m3 r4nd0m str1ng', (err, decoded) => {
    if (err) { return res.status(401).end() }

    const userId = decoded.sub

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).end()
        }

        req.user = user
        res.cookie('passport' , user._id);

        return next()
      })
  })
}

const tokenDecoder = (req , res , next) =>{

  if(req.user){
    next();
  }

  if(!req.headers.authorization){
    next();
  }

  const token = req.headers.authorization;

  jwt.verify(token , 's0m3 r4nd0m str1ng' , (err , decoded) =>{

    if(!decoded){
      return next();
    }

    if(err) next()

    User.findById(decoded.userId).then((user) =>{
      if(!user){
        return next();
      }

      req.logIn(user , err =>{
        if(err){
          next();
        }
      })
      return next();
    })
  })

}



module.exports = {
  jwtAuthCheck,
  tokenDecoder
}