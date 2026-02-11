import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import SiteConfig from './models/SiteConfig.js'; // Import a model to test operation

dotenv.config();

const testConnection = async () => {
    console.log('--- Starting MongoDB Connection Test ---'.cyan.bold);
    const uri = process.env.MONGO_URI;

    // Mask password for logging
    const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
    console.log(`URI: ${maskedUri}`);

    try {
        const conn = await mongoose.connect(uri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`.green.bold);

        // Test Read Operation
        console.log('Testing Read Operation (SiteConfig)...'.yellow);
        const config = await SiteConfig.findOne();
        if (config) {
            console.log('✅ Read Successful: Found SiteConfig'.green);
        } else {
            console.log('ℹ️ Read Successful: No SiteConfig found (Collection might be empty)'.blue);
        }

        console.log('--- Test Completed Successfully ---'.cyan.bold);
        process.exit(0);
    } catch (error) {
        console.error(`❌ Connection Error: ${error.message}`.red.bold);
        if (error.name === 'MongooseServerSelectionError') {
            console.error('   -> Check your IP Whitelist in MongoDB Atlas (Network Access)'.red);
            console.error('   -> Check if your URI is correct'.red);
        }
        process.exit(1);
    }
};

testConnection();
