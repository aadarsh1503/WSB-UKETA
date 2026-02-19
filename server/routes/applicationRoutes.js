import express from 'express';
import { submitApplication, upload, createPaymentSession } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', upload, submitApplication);
router.post('/create-payment-session', createPaymentSession);

export default router;