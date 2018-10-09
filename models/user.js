const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: {
		type: String,
		required: true,
		unique: true,
		min: [ 6, 'Password should have 6 characters' ]
	},
	joined: { type: Date, default: Date.now }
});

UserSchema.virtual('fullName').get(() => {
	return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('url').get(() => {
	return '/user/' + this._id;
});

UserSchema.virtual('joined_formatted').get(() => {
	return moment(this.joined).format('D MMMM YYYY');
});

UserSchema.static.findUserByEmail = (email) => {
	return User.findOne({ email: email }).exec();
};

UserSchema.methods.comparePassword = (passwordToCompare) => {
	if (this.password === passwordToCompare) {
		return true;
	} else {
		return false;
	}
};

let User = (module.exports = mongoose.model('User', UserSchema));
