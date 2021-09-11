const express = require("express");
const PORT = process.env.PORT || 5000;
const Feedback = require("./endpoints/Feedback");
const FeedbackModel = require("./models/Feedback");
var dayjs = require("dayjs");

require("dotenv").config();

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

app.use(express());

app.get("/api", (req, res) => res.send("API"));

app.set("view engine", "ejs").get("/", (req, res) => {
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

    res.render("pages/index", {
      items: results.map((item) => {
        return {
          store: item.store,
          date: dayjs(item.date).format("MM/DD/YYYY"),
          rating: item.rating,
          clean: item.clean === "thumbs-up" ? "Yes" : "No",
          greeted: item.greeted === "thumbs-up" ? "Yes" : "No",
        };
      }),
      chartLabels,
      chartData,
    });
  });
});

app.listen(PORT, () => console.log(`Ended up listening on ${PORT}`));
