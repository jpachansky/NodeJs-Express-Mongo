import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const router = express.Router();
const viewsDir = path.dirname(require.main.filename) + '/views/';

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.use(bodyParser.urlencoded({ extended: true }));

router.use('/jobs', require('./jobs'));

// HOME
router.get("/", function (req, res) {
  res.render(viewsDir + "index.ejs", { environment: process.env.NODE_ENV, username: req.connection.user });
});

// 404
router.get("*", function (req, res) {
  res.render(viewsDir + "404.ejs");
});

module.exports = router;