const Club = require("../models/clubs");

exports.index = function(req, res) {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

// Display list of all Clubs.
exports.club_list = function(req, res) {
  res.send("NOT IMPLEMENTED: Club list");
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
