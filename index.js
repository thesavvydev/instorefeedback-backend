const express = require("express");
const PORT = process.env.PORT || 5000;
const Feedback = require("./endpoints/Feedback");

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

app.set("view engine", "ejs").get("/", (req, res) => res.render("pages/index"));

app.listen(PORT, () => console.log(`Ended up listening on ${PORT}`));
