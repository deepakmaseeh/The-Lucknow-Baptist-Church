import express from 'express';
import { getSiteSettings, updateSiteSettings } from '../controllers/siteConfigController.js';

const router = express.Router();

// Public route to get settings
router.get('/public', getSiteSettings);

// Protected route to update settings (Auth middleware to be added)
// For now, it's open, but in production, you MUST protect this.
router.put('/', updateSiteSettings);

export default router;
