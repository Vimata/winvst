const Stream = require("../models/streams");

// Display list of all Streams.
exports.stream_list = function(req, res) {
  res.send("NOT IMPLEMENTED: Stream list");
};

// Display detail page for a specific Stream.
exports.stream_detail = function(req, res) {
  res.send("NOT IMPLEMENTED: Stream detail: " + req.params.id);
};

// Display Stream create form on GET.
exports.stream_create_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Stream create GET");
};

// Handle Stream create on POST.
exports.stream_create_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Stream create POST");
};

// Display Stream delete form on GET.
exports.stream_delete_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Stream delete GET");
};

// Handle Stream delete on POST.
exports.stream_delete_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Stream delete POST");
};

// Display Stream update form on GET.
exports.stream_update_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Stream update GET");
};

// Handle Stream update on POST.
exports.stream_update_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Stream update POST");
};
