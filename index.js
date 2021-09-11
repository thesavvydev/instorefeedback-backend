const express = require("express");
const PORT = process.env.PORT || 5000;
const Feedback = require("./endpoints/Feedback");

require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://thesavvydev:${process.env.DB_PASSWORD}@cluster0.a9zcg.mongodb.net/instorefeedback?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((err) => console.log(err));

const app = express();

app.use("/api/feedback", Feedback);

app.use(express());

app.get("/api", (req, res) => res.send("API"));

app.set("view engine", "ejs").get("/", (req, res) => res.render("pages/index"));

app.listen(PORT, () => console.log(`Ended up listening on ${PORT}`));
