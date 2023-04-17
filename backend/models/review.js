const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  properties_id: { type: Schema.Types.ObjectId, required: true, ref: "property" },
  user_rating: String,
  feedBack_description: String,
  feedBack_date: Date,
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("review", reviewSchema);
