const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//The vote categories
const OptionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    }
}, { _id: false });

//The entire poll schema
const EbateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    options: {
        type: [OptionSchema],
        required: true
    },
    ipAndUsersVoted: [String]

});

const Ebate = module.exports = mongoose.model('Ebate', EbateSchema);
