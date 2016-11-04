const http = require('http');
const modelJob = require('../models/job');
const config = require("../config");
const logger = require("../utils/logger");

var appDir = require('path').dirname(require.main.filename);
const path = appDir + '/views/';

module.exports = {

    // LIST ALL JOBS    
    getAll: function (req, res) {
        modelJob.getAll()
        .then(function (results) {            
            res.render(path + 'jobs.ejs', { jobs: results });
        })
        .catch(function(e) {
            res.render(path + 'error.ejs', { error: e.message })
        });
    },

    // NEW JOB    
    newJob: function (req, res) {
        res.render(path + 'job.ejs', { job: null, result: null });
    },

    // GET EXISTING JOB    
    getJob: function (req, res) {
        modelJob.get(req.params.id)
        .then(function (results) {            
            res.render(path + 'job.ejs', { job: results, result: '' });
        })
        .catch(function(e) {
            res.render(path + 'error.ejs', { error:e.message })
        });
    },

    // SAVE JOB    
    saveJob: function (req, res) {         
        var error = null;
        var result = null;

        if (!req.body.inpJobId) {   
            var job = {name: req.body.inpName, description: req.body.inpDescription};        
            modelJob.create(job)
            .then(function (results) {            
                result = results;
            })
            .catch(function(e) {
                error = e;
            });
        } else {
            var job = {_id: req.body.inpJobId, name: req.body.inpName, description: req.body.inpDescription};
            modelJob.update(job)
            .then(function (results) {            
                result = results;
            })
            .catch(function(e) {
                error = e;
            });
        }

        if (error) {
            logger.log("error", error.message);
            res.render(path + 'error.ejs', { error: error.message })
        } else {
            res.render(path + 'job.ejs', { job: job, result: result })
        }
    }
}