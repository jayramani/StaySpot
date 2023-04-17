const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  property_id: { type: Schema.Types.ObjectId, required: true, ref: "property" },
});

module.exports = mongoose.model("favourite", favouriteSchema);
