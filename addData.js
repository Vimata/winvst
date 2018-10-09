#! /usr/bin/env node

console.log(
	'This script populates some test users, clubs and categoriess to the database. Specified database as argument - e.g.: addData mongodb://your_username:your_password@your_dabase_url'
);

const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
	console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
	return;
}

const async = require('async');
const User = require('./models/user');
const Club = require('./models/club');
const Category = require('./models/category');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = [];
let clubs = [];
let categories = [];

function clubCreate(name, description, category, cb) {
	let clubdetail = {
		name: name,
		description: description,
		category: category
	};
	if (description != false) clubdetail.description = description;

	let club = new Club(clubdetail);

	club.save(function(err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New Club: ' + club);
		clubs.push(club);
		cb(null, club);
	});
}

function userCreate(firstName, lastName, email, password, club, cb) {
	userdetail = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
		club: club
	};

	let user = new User(userdetail);

	user.save(function(err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New User: ' + user);
		users.push(user);
		cb(null, user);
	});
}

function categoryCreate(name, cb) {
	let category = new Category({ name: name });

	category.save(function(err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New Category: ' + category);
		categories.push(category);
		cb(null, category);
	});
}

function createClubs(cb) {
	async.parallel(
		[
			function(callback) {
				clubCreate(
					'Malabu Club',
					'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life.',
					categories[0],
					callback
				);
			},
			function(callback) {
				clubCreate(
					'The Wise Club',
					'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic...',
					categories[1],
					callback
				);
			},
			function(callback) {
				clubCreate(
					'The Slow Club',
					'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms.',
					categories[1],
					callback
				);
			},
			function(callback) {
				clubCreate(
					'Apes and Angels Club',
					'Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it.',
					categories[0],
					callback
				);
			},
			function(callback) {
				clubCreate(
					'Death Club',
					"In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system.",
					categories[1],
					callback
				);
			},
			function(callback) {
				clubCreate('Test Club', 'Summary of test club 1', categories[1], callback);
			},
			function(callback) {
				clubCreate('Test Club 2', 'Summary of test club 2', categories[0], callback);
			}
		],
		cb
	);
}

function createUsers(cb) {
	async.parallel(
		[
			function(callback) {
				userCreate('Patrick', 'Rothfuss', 'patrick@me.com', 'password', clubs[0], callback);
			},
			function(callback) {
				userCreate('Ben', 'Bova', 'ben@mail.com', 'password', [ clubs[1], clubs[6] ], callback);
			},
			function(callback) {
				userCreate('Isaac', 'Asimov', 'isaac@mlaid.com', 'password', [ clubs[2], clubs[5] ], callback);
			},
			function(callback) {
				userCreate('Bob', 'Billings', 'bob@mlaid.com', 'password', clubs[3], callback);
			},
			function(callback) {
				userCreate('Jim', 'Jones', 'jim@acca.com', 'password', clubs[4], callback);
			}
		],
		// optional callback
		cb
	);
}

function createCategories(cb) {
	async.parallel(
		[
			function(callback) {
				categoryCreate('Stokvel', callback);
			},
			function(callback) {
				categoryCreate('Investment Club', callback);
			}
		],
		// optional callback
		cb
	);
}

console.log(clubs[1]);
async.series(
	[ createCategories, createClubs, createUsers ],
	// Optional callback
	function(err, results) {
		if (err) {
			console.log('FINAL ERR: ' + err);
		} else {
			console.log('Clubs: ' + clubs);
		}
		// All done, disconnect from database
		mongoose.connection.close();
	}
);
