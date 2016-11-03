const connect = require('./mongodb');
const mongo = require('mongodb');

module.exports =  { 
    
    // LIST ALL JOBS    
    getAll: function(callback) {
        connect(function(db) {
            db.collection('jobs').find().toArray(function (err, results) {
                callback(err, results);
            }) 
        });
    },

    // CREATE NEW JOB   
    create: function(job, callback) {
        connect(function(db) {
            db.collection('jobs').insert(job, function (err, results) {
                callback(err, results);
            })
        });
    },

    // GET JOB   
    get: function(id, callback) {
        connect(function(db) {
            db.collection('jobs').findOne({_id: new mongo.ObjectID(id)}, function (err, results) {
                callback(err, results);
            }) 
        });
    },

    // UPDATE JOB   
    update: function(job, callback) {
        connect(function(db) {
            db.collection('jobs').update({_id:new mongo.ObjectID(job._id)}, {$set:{name:job.name, description: job.description}}, function (err, results) {
                callback(err, results);
            }) 
        });
    }
}