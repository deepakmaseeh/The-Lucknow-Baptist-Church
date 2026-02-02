import express from 'express';
import { getSermons, createSermon, deleteSermon } from '../controllers/sermonController.js';

const router = express.Router();

router.route('/')
    .get(getSermons)
    .post(createSermon);

router.route('/:id')
    .delete(deleteSermon);

export default router;
