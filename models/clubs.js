const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let ClubSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, max: 250 },
  user: [{ type: ObjectId, ref: "User" }],
  stream: [{ type: ObjectId, required: true }],
  created: { type: Date, default: Date.now }
});

ClubSchema.virtual("url").get(() => {
  return "/club/" + this._id;
});

module.exports = mongoose.model("Club", ClubSchema);
