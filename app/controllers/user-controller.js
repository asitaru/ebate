let twitterStrategy = require('passport-twitter').Strategy;
let User = require('../models/user');
const twitterKeys = require('../../config/auth');

//helper function that handles the user creation using information retrieved by twitter
let populateUser = (user, profile, token) => {
    user.userId = profile.id;
    user.token = token;
    user.displayName = profile.displayName;
};

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

    //passport configuration
    passport.use(new twitterStrategy({
        consumerKey: twitterKeys.consumerKey,
        consumerSecret: twitterKeys.consumerSecret,
        callbackURL: twitterKeys.callbackURL
    },
    //function that handles the returned user
    (token, tokenSecret, profile, done) => {
        //try to find the user in the db
        User.findOne({ 'userId' : profile.id }).then(
            user => {
                if(user) {
                    //if a user is found, return it
                    return done(null, user);
                }
                else {
                    //if not, create a new user
                    let newUser = new User();
                    populateUser(newUser, profile, token);
                    //afterwards try to save the user in the db and handle errors
                    newUser
                        .save()
                        //return the success function if user saved or the rejection one if there was an error
                        .then( () => done(null, newUser))
                        .catch( err => done(err));
                }
            }
        //handle any erros left from user querying
        ).catch( err => done(err));
    }));
};
