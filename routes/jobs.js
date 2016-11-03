const express = require('express')
const router = express.Router();
const controllerJob = require('../controllers/jobs');

// LIST ALL JOBS
router.get("/", controllerJob.getAll);

// CREATE NEW JOB
router.get("/new", controllerJob.newJob);

// GET EXISTING JOB
router.get("/:id", controllerJob.getJob);

// SAVE JOB
router.post('/', controllerJob.saveJob);

module.exports = router;