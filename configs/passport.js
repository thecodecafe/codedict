const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const jwtConfig = require('../configs/jwt');

/**
 * Here we use passports' jwt strategy to
 * get the user from the token passed in
 * the authorizations header.
 */
passport.use( new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret
  },
  (payload, done) => {
    // fund user bearing the user id on the payload
    User.findOne({ where: { id: payload.user_id }})
        .then((user) => {
          // check if the user does not exist
          if(!user){
          // return an error response
          done(new Error('invalid token'), false)
          // stop executing function
          return;
        }
        // continue request
        done(null, user);
      });
  }
));

// export passport
module.exports = passport;