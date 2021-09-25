const express = require("express");
const PORT = process.env.PORT || 5000;
const Feedback = require("./endpoints/Feedback");
const FeedbackModel = require("./models/Feedback");
const Store = require("./endpoints/Store");
const StoreModel = require("./models/Store");
var dayjs = require("dayjs");

require("dotenv").config();

const ratings = ["😡", "🙁", "😐", "😀", "😍"];

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(`Database connected.`);
  })
  .catch((err) => {
    console.log("MONOGO CONNECT ERROR");
    console.log(err);
  });

const app = express();

app.use("/api/feedback", Feedback);
app.use("/api/store", Store);

app.use(express());

app.get("/api", (req, res) => res.send("API"));

app.set("view engine", "ejs").get("/", async (req, res) => {
  FeedbackModel.find().then((results) => {
    const chartDates = results.map((item) =>
      dayjs(item.date).format("MM/DD/YYYY")
    );

    const chartLabels = [...new Set(chartDates)];
    const chartData = chartLabels
      .sort((a, b) => new Date(a) - new Date(b))
      .map((date) => {
        return results.filter(
          (item) => dayjs(item.date).format("MM/DD/YYYY") === date
        ).length;
      });

    const ratingsArr = results.map((item) => item.rating) || [];
    const reducedRatings =
      results.length > 0 ? ratingsArr.reduce((a, b) => a + b) : 0;
    const averageRating =
      reducedRatings > 0 ? reducedRatings / results.length : 0.0;

    const stats = {
      total: results.length,
      average_rating: averageRating,
    };

    if (stats.average_rating > 0)
      stats.average_rating = stats.average_rating.toFixed(2);

    res.render("pages/index", {
      items: results.map((item) => {
        return {
          store: item.store_title,
          date: dayjs(item.date).format("MM/DD/YYYY"),
          rating: ratings[item.rating - 1],
          clean: item.clean === "thumbs-up" ? "Yes" : "No",
          greeted: item.greeted === "thumbs-up" ? "Yes" : "No",
          rateService: item.rateService,
          mealExpectations: item.mealExpectations,
        };
      }),
      chartLabels,
      chartData,
      stats,
    });
  });
});

app.listen(PORT, () => console.log(`Ended up listening on ${PORT}`));
