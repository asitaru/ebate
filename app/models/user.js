const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    userId: String,
    token: String,
    displayName: String,
    username: String
});

const User = module.exports = mongoose.model('User', UserSchema);
