const config = require('../config');
const MongoClient = require('mongodb').MongoClient;

var db = null;
var connect = function(callback) {
    if (db) {
        return callback(db);
    }

    MongoClient.connect(config.mongodb.url, (err, database) => {
        if (err) 
            return console.log(err);

        db = database;
        return callback(db);   
    });
};

module.exports = connect;