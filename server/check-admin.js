import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const logFile = fs.createWriteStream('admin-check.log', { flags: 'w' });
const log = (msg) => {
    console.log(msg);
    logFile.write(msg + '\n');
};

const checkAdmin = async () => {
    try {
        log('Starting checkAdmin...');
        await connectDB();
        log('Connected to DB');

        const user = await User.findOne({ username: 'admin' });
        if (user) {
            log(`Admin user found: ${user.username}`);
            log(`Is Admin: ${user.isAdmin}`);
            log(`Password Hash: ${user.password}`);
        } else {
            log('Admin user NOT found');
        }
        process.exit();
    } catch (error) {
        log(`Error: ${error.message}`);
        process.exit(1);
    }
};

checkAdmin();
