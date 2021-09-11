const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  res.send("feedback api");
});

router.post("/", jsonParser, (req, res) => {
  const feedback = new Feedback({
    store: req.body.store,
    date: req.body.date,
    rating: req.body.rating,
    clean: req.body.clean,
    greeted: req.body.greeted,
  });

  feedback
    .save()
    .then((result) => {
      res.send({
        message: "Feedback recieved",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
