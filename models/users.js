const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    unique: true,
    min: [6, "Password should have 6 characters"]
  },
  joined: { type: Date, default: Date.now },
  club: [{ type: ObjectId, ref: "Club" }]
});

UserSchema.virtual("fullName").get(() => {
  return this.firstName + " " + this.lastName;
});
UserSchema.virtual("url").get(() => {
  return "/user/" + this._id;
});

let User = (module.exports = mongoose.model("User", UserSchema));
