const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const appDir = require('path').dirname(require.main.filename);
const path = appDir + '/views/';

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.use(bodyParser.urlencoded({ extended: true }));

router.use('/jobs', require('./jobs'));

// HOME
router.get("/", function (req, res) {
  res.render(path + "index.ejs", { environment: process.env.NODE_ENV, username: req.connection.user });
});

// 404
router.get("*", function (req, res) {
  res.render(path + "404.ejs");
});

module.exports = router;