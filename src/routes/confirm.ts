import express from 'express';
import { confirm } from '../controllers/confirmController';

const router = express.Router();

// Define routes
router.route('/confirm').patch(confirm)

export default router;
