const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String, 
	photo: String,
	caption: String
});

const User = mongoose.model('User', imageSchema);

module.exports = User;