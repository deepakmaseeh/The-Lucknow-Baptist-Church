import express from 'express';
import { searchContent } from '../controllers/searchController.js';

const router = express.Router();

router.route('/').get(searchContent);

export default router;
