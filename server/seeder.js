import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from './models/User.js';
import Blog from './models/Blog.js';
import Sermon from './models/Sermon.js';
import SiteConfig from './models/SiteConfig.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Blog.deleteMany();
        await Sermon.deleteMany();
        await SiteConfig.deleteMany(); // Added SiteConfig deleteMany

        // Create Admin User
        const createdUsers = await User.create([
            {
                username: 'admin',
                password: '123456', // Will be hashed by pre-save hook
                isAdmin: true,
            },
        ]);

        const adminUser = createdUsers[0]._id;

        // Create Default Site Config
        await SiteConfig.create({
            siteName: 'The Lucknow Baptist Church',
            tagline: 'A Place to Belong',
            theme: {
                primaryColor: '#D4AF37',
                secondaryColor: '#111111',
                backgroundColor: '#f4f1ea'
            }
        });

        // Create Sample Blogs
        const sampleBlogs = [
            {
                title: 'Welcome to Our New Website',
                author: 'Pastor John',
                content: 'We are excited to launch our new church website! Stay tuned for updates.',
                category: 'News',
                date: '2026-02-01',
                image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
            },
            {
                title: 'Finding Peace in Chaos',
                author: 'Sarah Smith',
                content: 'In a world that is often chaotic, we can find true peace through prayer and community...',
                category: 'Devotional',
                date: '2026-01-25',
                image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=80',
            },
        ];

        await Blog.insertMany(sampleBlogs);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Blog.deleteMany();
        await Sermon.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
