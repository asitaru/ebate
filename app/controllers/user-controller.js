let twitterStrategy = require('passport-twitter').Strategy;
let User = require('../models/user');
const twitterKeys = require('../../config/auth');

module.exports = function(passport) {

    // serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //deserialize user
    passport.deserializeUser((id,done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new twitterStrategy(twitterKeys, async(token, tokenSecret, profile, done) => {

        try {
            //search the user
            let user = await User.findById(profile.id);

            //if an user is found, return it
            if(user) {
                return done(null, user);
            }
            //create the user if it doesn't exist
            else {
                let newUser = new User();
                newUser.id = profile.id;
                newUser.token = token;
                newUser.displayName = profile.displayName;

                //try to save the user
                try {
                    await newUser.save();

                    return done(null, newUser);
                }
                catch(err) {
                    throw err;
                }
            }


        }
        catch(err) {
            return done(err);
        }
    }));
};
