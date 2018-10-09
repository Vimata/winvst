const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClubSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, max: 250 },
	category: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true } ],
	created: { type: Date, default: Date.now }
});

ClubSchema.virtual('url').get(() => {
	return '/club/' + this._id;
});

ClubSchema.virtual('created_formatted').get(() => {
	return moment(this.created).format('D MMMM YYYY');
});

module.exports = mongoose.model('Club', ClubSchema);
