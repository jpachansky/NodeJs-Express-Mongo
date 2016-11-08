import express from 'express';
import controllerJob from '../controllers/jobs';

const router = express.Router();

// LIST ALL JOBS
router.get("/", controllerJob.getAll);

// CREATE NEW JOB
router.get("/new", controllerJob.newJob);

// GET EXISTING JOB
router.get("/:id", controllerJob.getJob);

// SAVE JOB
router.post('/', controllerJob.saveJob);

module.exports = router;