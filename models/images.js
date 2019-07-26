const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	name: String, 
	photo: String,
	caption: String,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;