const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    firstName:  { type: String, required: true},
    rate:  { type: String, required: true},
    review:  { type: String, required: true},
});


module.exports = mongoose.model('review', reviewsSchema,'reviews');
