const http = require('http');
const modelJob = require('../models/job');
const config = require("../config");
const logger = require("../utils/logger");

var appDir = require('path').dirname(require.main.filename);
const path = appDir + '/views/';

module.exports = {

    // LIST ALL JOBS    
    getAll: function (req, res) {
        modelJob.getAll(function (err, allJobs) {            
            if (err) {
                logger.log("error", err.message);
                res.render(path + 'error.ejs', { error: err.message })
            } else {
                res.render(path + 'jobs.ejs', { jobs: allJobs });
            }
        });
    },

    // NEW JOB    
    newJob: function (req, res) {
        res.render(path + 'job.ejs', { job: null, result: null });
    },

    // GET EXISTING JOB    
    getJob: function (req, res) {
        modelJob.get(req.params.id, function (err, createRes) {
            if (err) {
                logger.log("error", err.message);
                res.render(path + 'error.ejs', { error: err.message })
            } else {
                res.render(path + 'job.ejs', { job: createRes, result: '' })
            }
        });
    },

    // SAVE JOB    
    saveJob: function (req, res) {         
        var error = null;
        var result = null;

        if (!req.body.inpJobId) {   
            var job = {name: req.body.inpName, description: req.body.inpDescription};        
            modelJob.create(job, function (err, createRes) {     
                error = err;
                result = createRes;
            });
        } else {
            var job = {_id: req.body.inpJobId, name: req.body.inpName, description: req.body.inpDescription};
            modelJob.update(job, function (err, updateRes) {
                error = err;
                result = updateRes;
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