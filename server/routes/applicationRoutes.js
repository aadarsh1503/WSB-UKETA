import express from 'express';
import { submitApplication, upload  } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', upload, submitApplication);

export default router;