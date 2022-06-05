const FacebookStrategy = require("passport-facebook").Strategy;
// const config = require("../config/facebookData");
const user = require("../model/user");

const facebook_api_key = process.env.MONGOURL;
const facebook_api_secret = process.env.MONGOURL;
const callback_url = process.env.MONGOURL;

module.exports = function (passport) {
  // Passport session setup.
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: facebook_api_key,
        clientSecret: facebook_api_secret,
        callbackURL: callback_url,
      },
      (accessToken, refreshToken, profile, done) => {
        // find if a user exist with this email or not

        user.findOne({ facebookId: profile.id }).then((data) => {
          if (data) {
            return done(null, data);
          } else {
            user({
              username: profile.displayName,
              facebookId: profile.id,
              password: null,
              provider: "facebook",
              isVerified: true,
            }).save(function (err, data) {
              return done(null, data);
            });
          }
        });
      }
    )
  );
};
