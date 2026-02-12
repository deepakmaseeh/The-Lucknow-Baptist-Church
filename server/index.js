import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import sermonRoutes from './routes/sermonRoutes.js';
import seriesRoutes from './routes/seriesRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import revisionRoutes from './routes/revisionRoutes.js';
import workflowRoutes from './routes/workflowRoutes.js';
import podcastRoutes from './routes/podcastRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import siteConfigRoutes from './routes/siteConfigRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { getSitemap } from './controllers/sitemapController.js';
import schedulePublishing from './utils/scheduledPublishing.js';
import { connectRedis, disconnectRedis } from './config/redis.js';

// ... (other imports)

// Load env vars
dotenv.config();
console.log('Loaded PORT:', process.env.PORT);

// Connect to Database
connectDB();

// Connect to Redis (optional - app continues if Redis fails)
connectRedis();

// Start scheduled publishing cron job
schedulePublishing();

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors());

// Make Uploads Folder Static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/sitemap.xml', getSitemap);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/sermons', sermonRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/revisions', revisionRoutes);
app.use('/api/workflow', workflowRoutes);
app.use('/api/podcast', podcastRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/settings', siteConfigRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
