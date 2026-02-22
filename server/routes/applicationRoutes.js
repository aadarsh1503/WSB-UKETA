import express from 'express';
import { submitApplication, upload, createPaymentSession, verifyPayment } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', upload, submitApplication);
router.post('/create-payment-session', createPaymentSession);
router.post('/verify-payment', verifyPayment);

export default router;