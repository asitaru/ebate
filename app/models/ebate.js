const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//The vote categories
const OptionSchema = new Schema({
    name: String,
    votes: Number
}, { _id: false });

//The entire poll schema
const EbateSchema = new Schema({
    name: String,
    ownerId: String,
    options: {
        type: [OptionSchema],
        required: true
    },
    ipAndUsersVoted: [String]

});

const Ebate = module.exports = mongoose.model('Ebate', EbateSchema);
