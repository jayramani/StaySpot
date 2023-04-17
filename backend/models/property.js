const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  title: String,
  location: String,
  // isAvailable: { type: Boolean, default: true },
  description: String,
  cleaningfee: String,
  servicefee: String,
  amenities: String,
  bedrooms: String,
  pricepernight: String,
  shortdescription: String,
  // imageName: String,
  ratings: String,
  S3Image: String,
});

module.exports = mongoose.model("property", propertySchema);
