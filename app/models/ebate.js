const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    name: String,
    votes: Number
});

const EbateSchema = new Schema({
    name: String,
    ownerId: String,
    options: {
        type: [OptionSchema],
        required: true
    }

});

const Ebate = module.exports = mongoose.model('Ebate', EbateSchema);
