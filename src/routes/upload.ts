import express from 'express';
import { upload } from '../controllers/uploadController';

const router = express.Router();

// Define routes
router.route('/upload').post(upload)

export default router;
