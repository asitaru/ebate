const getController = require('./controllers/get-controller');
const postController = require('./controllers/post-controller');
const deleteController = require('./controllers/delete-controller');
const voteController = require('./controllers/vote-controller');
const userController = require('./controllers/user-controller');
const jwt = require('jsonwebtoken');

//route middleware to check if user is logged in
let ensureAuthenticated = (req, res, next) => {
    //if user is authenticated, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    //return to homepage if not
    res.redirect('/');
}

module.exports = function(app, passport) {
    //get all ebates
    app.get('/api/ebates', getController);

    //get one ebate
    app.get('/api/ebates/:ebate_id', getController.singleQuery)

    //get ebates by user
    app.put('/api/ebates-by-user', getController.userQuery);

    //create an ebate
    app.post('/api/ebates/', postController);

    //vote in the ebate
    app.put('/api/ebates/:ebate_id', voteController.existingOption);

    //add an option
    app.put('/api/ebates/:ebate_id/new', voteController.newOption);

    //delete the ebate
    app.delete('/api/ebates/:ebate_id', deleteController);

    //login with twitter
    app.get('/api/login', passport.authenticate('twitter'));
    app.get('/api/login/callback',
        passport.authenticate('twitter', { failureRedirect: '/'}),
        (req, res) => {
            res.redirect('/#!/user/' + token);
        }
    );

    app.get('/api/me', ensureAuthenticated, userController.fetchUser);

    //logout
    app.get('/api/logout', userController.logout);

    //main route
    app.get('/', (req,res) => {
        res.sendFile('/index.html');
    })
};
