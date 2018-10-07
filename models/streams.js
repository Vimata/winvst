const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let streamSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Investment Club", "Stokvel"],
    default: "Investment Club",
    unique: true
  }
});

module.exports = mongoose.model("Stream", streamSchema);
