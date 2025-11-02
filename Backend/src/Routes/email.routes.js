import express from 'express';
import { sendEmails } from '../controllers/email.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Send bulk emails (protected route)
router.post('/sendEmails', auth, sendEmails);

export default router;
