import { getRedisClient, isRedisAvailable } from '../config/redis.js';

// Cache middleware factory
const cacheMiddleware = (duration = 300) => {
    return async (req, res, next) => {
        // Skip caching for non-GET requests
        if (req.method !== 'GET') {
            return next();
        }

        // Skip if Redis is not available
        if (!isRedisAvailable()) {
            return next();
        }

        try {
            const redis = getRedisClient();
            const key = `cache:${req.originalUrl || req.url}`;

            // Try to get cached data
            const cachedData = await redis.get(key);

            if (cachedData) {
                console.log(`✅ Cache HIT: ${key}`);
                return res.json(JSON.parse(cachedData));
            }

            console.log(`❌ Cache MISS: ${key}`);

            // Store original res.json
            const originalJson = res.json.bind(res);

            // Override res.json to cache the response
            res.json = function (data) {
                // Cache the response
                redis.setEx(key, duration, JSON.stringify(data))
                    .catch(err => console.error('Cache set error:', err));

                // Send the response
                return originalJson(data);
            };

            next();
        } catch (error) {
            console.error('Cache middleware error:', error);
            next();
        }
    };
};

// Invalidate cache by pattern
const invalidateCache = async (pattern) => {
    if (!isRedisAvailable()) {
        return;
    }

    try {
        const redis = getRedisClient();
        const keys = await redis.keys(pattern);

        if (keys.length > 0) {
            await redis.del(keys);
            console.log(`🗑️  Invalidated ${keys.length} cache entries matching: ${pattern}`);
        }
    } catch (error) {
        console.error('Cache invalidation error:', error);
    }
};

// Invalidate specific cache key
const invalidateCacheKey = async (key) => {
    if (!isRedisAvailable()) {
        return;
    }

    try {
        const redis = getRedisClient();
        await redis.del(key);
        console.log(`🗑️  Invalidated cache key: ${key}`);
    } catch (error) {
        console.error('Cache key invalidation error:', error);
    }
};

// Get cache statistics
const getCacheStats = async () => {
    if (!isRedisAvailable()) {
        return { available: false };
    }

    try {
        const redis = getRedisClient();
        const info = await redis.info('stats');
        const keys = await redis.dbSize();

        return {
            available: true,
            totalKeys: keys,
            info: info
        };
    } catch (error) {
        console.error('Cache stats error:', error);
        return { available: false, error: error.message };
    }
};

export { cacheMiddleware, invalidateCache, invalidateCacheKey, getCacheStats };
