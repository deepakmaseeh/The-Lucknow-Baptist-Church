import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const userExists = await User.findOne({ username: 'admin' });

        if (userExists) {
            console.log('Admin user already exists');
            // Optional: Update password if needed, but for now just exit
            process.exit();
        }

        const user = await User.create({
            username: 'admin',
            password: '123456',
            isAdmin: true,
        });

        console.log(`Admin user created: ${user.username}`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
