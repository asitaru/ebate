const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//We identify the votes by IP/Username
const VoteSchema = new Schema({
    IP: String,
    user: String
}, { _id: false });

//The vote categories
const OptionSchema = new Schema({
    name: String,
    votes: [VoteSchema]
}, { _id: false });

//The entire poll schema
const EbateSchema = new Schema({
    name: String,
    ownerId: String,
    options: {
        type: [OptionSchema],
        required: true
    }

});

const Ebate = module.exports = mongoose.model('Ebate', EbateSchema);
