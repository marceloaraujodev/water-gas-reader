import express from 'express';
import { getList } from '../controllers/getListController';

const router = express.Router();

// Define routes
router.route('/:customerId/list').get(getList)

export default router;