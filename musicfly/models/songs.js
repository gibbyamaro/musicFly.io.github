const mongoose = require('mongoose');

let songsScheme = new mongoose.Schema({
    title : String,
    artist : String,
    genre : String,
    link : String,

});

module.exports = mongoose.model('song', songsScheme);