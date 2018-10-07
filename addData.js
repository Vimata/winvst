#! /usr/bin/env node

console.log(
  "This script populates some test users, clubs and streamss to the database. Specified database as argument - e.g.: addData mongodb://your_username:your_password@your_dabase_url"
);

const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith("mongodb://")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

const async = require("async");
const User = require("./models/users");
const Club = require("./models/clubs");
const Stream = require("./models/streams");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

let users = [];
let clubs = [];
let streams = [];

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
    console.log("New User: " + user);
    users.push(user);
    cb(null, user);
  });
}

function streamCreate(name, cb) {
  let stream = new Stream({ name: name });

  stream.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Stream: " + stream);
    streams.push(stream);
    cb(null, stream);
  });
}

function clubCreate(name, description, members, stream, cb) {
  let clubdetail = {
    name: name,
    description: description,
    members: members,
    stream: stream
  };
  if (description != false) clubdetail.description = description;

  let club = new Club(clubdetail);

  club.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Club: " + club);
    clubs.push(club);
    cb(null, club);
  });
}

function createStreamUsers(cb) {
  async.parallel(
    [
      function(callback) {
        userCreate(
          "Patrick",
          "Rothfuss",
          "patrick@me.com",
          "password",
          clubs[1],
          callback
        );
      },
      function(callback) {
        userCreate(
          "Ben",
          "Bova",
          "ben@mail.com",
          "password",
          clubs[1],
          callback
        );
      },
      function(callback) {
        userCreate(
          "Isaac",
          "Asimov",
          "isaac@mlaid.com",
          "password",
          clubs[2],
          callback
        );
      },
      function(callback) {
        userCreate(
          "Bob",
          "Billings",
          "bob@mlaid.com",
          "password",
          clubs[3],
          callback
        );
      },
      function(callback) {
        userCreate(
          "Jim",
          "Jones",
          "jim@acca.com",
          "password",
          clubs[4],
          callback
        );
      },
      function(callback) {
        streamCreate("Stokvel", callback);
      },
      function(callback) {
        streamCreate("Investment Club", callback);
      }
    ],
    // optional callback
    cb
  );
}

function createClubs(cb) {
  async.parallel(
    [
      function(callback) {
        clubCreate(
          "Malabu Club",
          "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life.",
          users[0],
          streams[0],
          callback
        );
      },
      function(callback) {
        clubCreate(
          "The Wise Club",
          "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic...",
          [users[0], users[3]],
          streams[1],
          callback
        );
      },
      function(callback) {
        clubCreate(
          "The Slow Club",
          "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms.",
          [users[1], users[2]],
          streams[1],
          callback
        );
      },
      function(callback) {
        clubCreate(
          "Apes and Angels Club",
          "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it.",
          [users[2], users[3], users[0]],
          streams[0],
          callback
        );
      },
      function(callback) {
        clubCreate(
          "Death Club",
          "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system.",
          [users[1], users[2]],
          streams[1],
          callback
        );
      },
      function(callback) {
        clubCreate(
          "Test Club",
          "Summary of test club 1",
          [users[3], users[1]],
          streams[1],
          callback
        );
      },
      function(callback) {
        clubCreate(
          "Test Club 2",
          "Summary of test club 2",
          [users[1], users[2]],
          streams[0],
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}
console.log(clubs[1]);
async.series(
  [createStreamUsers, createClubs],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Clubs: " + clubs);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
