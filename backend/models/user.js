const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  emailId: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date },
  phoneNumber: { type: Number },
  isActive: { type: Boolean, default: true },
  userType: { type: String, default: "guest" },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userSchema);
