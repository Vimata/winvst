const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClubSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, max: 250 },
	user: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
	category: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true } ],
	created: { type: Date, default: Date.now }
});

ClubSchema.virtual('url').get(() => {
	return '/club/' + this._id;
});

module.exports = mongoose.model('Club', ClubSchema);
