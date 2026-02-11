import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinaryConfig.js';

const router = express.Router();

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    res.send(req.file.path);
});

export default router;
