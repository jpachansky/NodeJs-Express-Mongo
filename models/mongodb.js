const config = require('../config');
const MongoClient = require('mongodb').MongoClient;

var db = null;
var connect = function() {
    return new Promise(function (fulfill, reject){
        if (db) {
            return fulfill(db);
        }

        MongoClient.connect(config.mongodb.url, (err, database) => {
            if (err) 
                return reject(err);

            db = database;
            fulfill(db);   
        });
    });
};

module.exports = connect;