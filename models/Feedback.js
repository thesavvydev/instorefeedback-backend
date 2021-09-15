const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  store: String,
  store_title: String,
  date: Date,
  rating: Number,
  clean: String,
  greeted: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
