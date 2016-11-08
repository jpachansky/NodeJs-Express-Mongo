import express from 'express';
import routes from './routes';
import config from './config';
import logger from './utils/logger';
import nodeSSPI from 'node-sspi';

const app = express();
app.set('view engine', 'ejs');

// Authenticate request
app.use(function (req, res, next) {
  var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: true
  });
  nodeSSPIObj.authenticate(req, res, function (err) {
    res.finished || next();
  });
});

// Authorise user
app.use(function (req, res, next) {
  if (req.connection.userGroups.indexOf("MyDomain\\MyUserGroup") > -1) {  // Use your own user group
    logger.log("debug", req.connection.user + " is authenticated");
  }
  else{
    logger.log("debug", req.connection.user + " is NOT authenticated");
    //res.send("You are not authorised to access this page.");
  }
  next();
});

app.use(routes);

app.listen(config.port, function () {
  logger.log("info", "Live at Port " + config.port);
});