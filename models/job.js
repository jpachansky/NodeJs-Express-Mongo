const connect = require('./mongodb');
const mongo = require('mongodb');

module.exports =  { 
    
    // LIST ALL JOBS    
    getAll: function() {
        return new Promise(function (fulfill, reject){
            connect()
            .then(function (db) {   
                db.collection('jobs').find().toArray(function (err, results) {
                    fulfill(results);
                });                
            })
            .catch(function(e) {
                reject(e);
            });
        });
    },

    // CREATE NEW JOB   
    create: function(job) {
        return new Promise(function (fulfill, reject){
            connect()
            .then(function (db) {   
                db.collection('jobs').insert(job, function (err, results) {
                    fulfill(results);
                });                
            })
            .catch(function(e) {
                reject(e);
            });
        });
    },

    // GET JOB   
    get: function(id) {
        return new Promise(function (fulfill, reject){
            connect()
            .then(function (db) {   
                db.collection('jobs').findOne({_id: new mongo.ObjectID(id)}, function (err, results) {
                    fulfill(results);
                });                
            })
            .catch(function(e) {
                reject(e);
            });
        });
    },

    // UPDATE JOB   
    update: function(job) {
        return new Promise(function (fulfill, reject){
            connect()
            .then(function (db) {   
                db.collection('jobs').update({_id:new mongo.ObjectID(job._id)}, {$set:{name:job.name, description: job.description}}, function (err, results) {
                    fulfill(results);
                });                
            })
            .catch(function(e) {
                reject(e);
            });
        });
    }
}