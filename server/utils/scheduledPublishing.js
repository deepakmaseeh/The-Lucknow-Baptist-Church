import cron from 'node-cron';
import Blog from '../models/Blog.js';
import Sermon from '../models/Sermon.js';

// Run every hour to check for scheduled posts
const schedulePublishing = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            const now = new Date();

            // Find and publish blogs that are scheduled and past their publish date
            const blogsToPublish = await Blog.updateMany(
                {
                    isPublished: false,
                    publishDate: { $lte: now }
                },
                {
                    $set: { isPublished: true }
                }
            );

            // Find and publish sermons that are scheduled and past their publish date
            const sermonsToPublish = await Sermon.updateMany(
                {
                    isPublished: false,
                    publishDate: { $lte: now }
                },
                {
                    $set: { isPublished: true }
                }
            );

            if (blogsToPublish.modifiedCount > 0 || sermonsToPublish.modifiedCount > 0) {
                console.log(`✅ Published ${blogsToPublish.modifiedCount} blog(s) and ${sermonsToPublish.modifiedCount} sermon(s)`);
            }
        } catch (error) {
            console.error('❌ Error in scheduled publishing:', error);
        }
    });

    console.log('📅 Scheduled publishing cron job started (runs every hour)');
};

export default schedulePublishing;
