const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    id: String,
    token: String,
    displayName: String
});

const User = module.exports = mongoose.model('User', UserSchema);
