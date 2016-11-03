const express = require("express");
const app = express();
const routes = require("./routes");
const config = require("./config");
const logger = require("./utils/logger");

app.set('view engine', 'ejs');

// Authenticate request
app.use(function (req, res, next) {
  var nodeSSPI = require('node-sspi');
  var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: true
  });
  nodeSSPIObj.authenticate(req, res, function (err) {
    res.finished || next();
  });
});

// Authorise user
app.use(function (req, res, next) {
  if (req.connection.userGroups.indexOf("RUFFER\\Developers") > -1) {
    logger.log("debug", req.connection.user + " is authenticated");
  }
  else{
    logger.log("debug", req.connection.user + " is NOT authenticated");
    res.send("You are not authorised to access this page.");
  }
  next();
});

app.use(routes);

app.listen(config.port, function () {
  logger.log("info", "Live at Port " + config.port);
});