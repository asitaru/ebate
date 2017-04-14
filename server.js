const express = require('express');
let app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');

//config files
var db = require('./config/db');

// set port
app.set('port', (process.env.PORT || 5000));

//connect to db
mongoose.connect(db.url);

//parse application
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: true }));

//passport configuration
require('./app/controllers/user-controller')(passport);

//required for passport
app.use(session({
    secret: 'fmlthisentireauththingiscrazy',
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set static files
app.use(express.static(__dirname + '/public'));

// routes
require('./app/routes')(app, passport);

//start server
app.listen(app.get('port'), () => console.log('App is running on port', app.get('port')));

// expose app
exports = module.exports = app;
