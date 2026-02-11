import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from '../models/Blog.js';
import Sermon from '../models/Sermon.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
};

const migrate = async () => {
    await connectDB();

    try {
        // Blogs
        const blogs = await Blog.find({});
        console.log(`Found ${blogs.length} blogs to check...`);
        for (const blog of blogs) {
            if (!blog.slug) {
                let baseSlug = slugify(blog.title);
                let slug = baseSlug;
                let counter = 1;

                // Simple check for uniqueness within this batch (not perfect for high concurrency but fine for migration)
                while (await Blog.findOne({ slug, _id: { $ne: blog._id } })) {
                    slug = `${baseSlug}-${counter}`;
                    counter++;
                }

                blog.slug = slug;

                // Calculate read time
                const wordCount = blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
                blog.readTime = Math.ceil(wordCount / 200);

                await blog.save();
                console.log(`Updated Blog: ${blog.title} -> ${slug}`);
            }
        }

        // Sermons
        const sermons = await Sermon.find({});
        console.log(`Found ${sermons.length} sermons to check...`);
        for (const sermon of sermons) {
            if (!sermon.slug) {
                let baseSlug = slugify(sermon.title);
                let slug = baseSlug;
                let counter = 1;

                while (await Sermon.findOne({ slug, _id: { $ne: sermon._id } })) {
                    slug = `${baseSlug}-${counter}`;
                    counter++;
                }

                sermon.slug = slug;
                await sermon.save();
                console.log(`Updated Sermon: ${sermon.title} -> ${slug}`);
            }
        }

        console.log('Migration completed successfully.');
        process.exit();

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrate();
