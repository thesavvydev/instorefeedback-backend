const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  store: Number,
  title: String,
  average_rating: Number,
});

module.exports = mongoose.model("Store", storeSchema);
