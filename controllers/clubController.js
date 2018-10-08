const Club = require("../models/clubs");
const User = require("../models/users");
const Stream = require("../models/streams");
const async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      club_count: callback => {
        Club.countDocuments({}, callback);
      },
      club_investment_count: callback => {
        Stream.countDocuments({ name: "Investment Club" }, callback);
      },
      club_stokvel_count: callback => {
        Stream.countDocuments({ name: "Stokvel" }, callback);
      },
      users_count: callback => {
        User.countDocuments({}, callback);
      }
    },
    function(err, results) {
      res.render("home", { title: "Dashboard", error: err, data: results });
    }
  );
};

// Display list of all Clubs.
exports.club_list = (req, res, next) => {
  Club.find({}, "name user")
    .populate("user")
    .exec((err, list_clubs) => {
      if (err) {
        return next(err);
      }
      //Successful, render view
      res.render("club_list", { title: "Club List", club_list: list_clubs });
    });
};

// Display detail page for a specific Club.
exports.club_detail = function(req, res) {
  res.send("NOT IMPLEMENTED: Club detail: " + req.params.id);
};

// Display Club create form on GET.
exports.club_create_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Club create GET");
};

// Handle Club create on POST.
exports.club_create_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Club create POST");
};

// Display Club delete form on GET.
exports.club_delete_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Club delete GET");
};

// Handle Club delete on POST.
exports.club_delete_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Club delete POST");
};

// Display Club update form on GET.
exports.club_update_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Club update GET");
};

// Handle Club update on POST.
exports.club_update_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Club update POST");
};
