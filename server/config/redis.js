import { createClient } from 'redis';

let redisClient = null;

const connectRedis = async () => {
    try {
        // Create Redis client
        redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: {
                reconnectStrategy: (retries) => {
                    if (retries > 10) {
                        console.error('❌ Redis: Too many reconnection attempts');
                        return new Error('Too many retries');
                    }
                    return retries * 100; // Exponential backoff
                }
            }
        });

        // Error handling
        redisClient.on('error', (err) => {
            console.error('❌ Redis Client Error:', err);
        });

        redisClient.on('connect', () => {
            console.log('🔄 Redis: Connecting...');
        });

        redisClient.on('ready', () => {
            console.log('✅ Redis: Connected and ready');
        });

        redisClient.on('reconnecting', () => {
            console.log('🔄 Redis: Reconnecting...');
        });

        // Connect to Redis
        await redisClient.connect();

        return redisClient;
    } catch (error) {
        console.error('❌ Redis connection failed:', error.message);
        console.log('⚠️  Continuing without Redis cache');
        return null;
    }
};

// Get Redis client instance
const getRedisClient = () => {
    return redisClient;
};

// Check if Redis is available
const isRedisAvailable = () => {
    return redisClient && redisClient.isOpen;
};

// Graceful shutdown
const disconnectRedis = async () => {
    if (redisClient && redisClient.isOpen) {
        await redisClient.quit();
        console.log('👋 Redis: Disconnected');
    }
};

export { connectRedis, getRedisClient, isRedisAvailable, disconnectRedis };
