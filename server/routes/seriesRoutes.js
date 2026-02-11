import express from 'express';
import {
    getAllSeries,
    getSeriesById,
    createSeries,
    updateSeries,
    deleteSeries
} from '../controllers/seriesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getAllSeries)
    .post(protect, createSeries);

router.route('/:id')
    .get(getSeriesById)
    .put(protect, updateSeries)
    .delete(protect, deleteSeries);

export default router;
