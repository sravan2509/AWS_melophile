const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let musicSchema = new Schema({
    Song_Url: {type: String, required: true},
    Song_Title: {type: String, required: true},
    Albam_Title:{type: String, required: true},
    playlist_title:{type: [String], required: true},
});


// Export the model
module.exports = mongoose.model('music', musicSchema);