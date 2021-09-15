const express = require("express");
const router = express.Router();
const Store = require("../models/Store");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  Store.find().then((results) => {
    res.json(results);
  });
});

router.post("/", jsonParser, (req, res) => {
  const store = new Store({
    store: req.body.store,
    title: req.body.title,
  });

  store
    .save()
    .then((result) => {
      res.send({
        message: "Store created",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
