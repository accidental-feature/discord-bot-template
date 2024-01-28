const { model, Schema } = require('mongoose');
 
let welcome = new Schema({
	Guild: String,
	Channel: String,
	Message: String,
	Reaction: String
})
 
module.exports = model('welcome', welcome);