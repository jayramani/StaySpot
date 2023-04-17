const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  property_id: { type: Schema.Types.ObjectId, required: true, ref: "property" },
  price_per_night: String,
  check_in_date: Date,
  check_out_date: Date,
  no_of_guests: String,
  extra_guests: String,
  total_amount: String,
  isCancelled: { type: Boolean, default: false },
});

module.exports = mongoose.model("reservation", reservationSchema);
