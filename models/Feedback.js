const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  store: Number,
  date: Date,
  rating: Number,
  clean: String,
  greeted: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
