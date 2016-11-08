import http from 'http';
import modelJob from '../models/job';
import config from '../config';
import logger from '../utils/logger';
import path from 'path';

const viewsDir = path.dirname(require.main.filename) + '/views/';

module.exports = {

    // LIST ALL JOBS    
    getAll: function (req, res) {
        modelJob.getAll()
        .then(function (results) {            
            res.render(viewsDir + 'jobs.ejs', { jobs: results });
        })
        .catch(function(e) {
            res.render(viewsDir + 'error.ejs', { error: e.message })
        });
    },

    // NEW JOB    
    newJob: function (req, res) {
        res.render(viewsDir + 'job.ejs', { job: null, result: null });
    },

    // GET EXISTING JOB    
    getJob: function (req, res) {
        modelJob.get(req.params.id)
        .then(function (results) {            
            res.render(viewsDir + 'job.ejs', { job: results, result: '' });
        })
        .catch(function(e) {
            res.render(viewsDir + 'error.ejs', { error:e.message })
        });
    },

    // SAVE JOB    
    saveJob: function (req, res) {         
        let error = null;
        let result = null;

        if (!req.body.inpJobId) {   
            let job = {name: req.body.inpName, description: req.body.inpDescription};        
            modelJob.create(job)
            .then(function (results) {            
                result = results;
            })
            .catch(function(e) {
                error = e;
            });
        } else {
            let job = {_id: req.body.inpJobId, name: req.body.inpName, description: req.body.inpDescription};
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
            res.render(viewsDir + 'error.ejs', { error: error.message })
        } else {
            res.render(viewsDir + 'job.ejs', { job: job, result: result })
        }
    }
}