const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 2000)
    }
});

client.connect().catch(console.error);

/**
 * Middleware to cache product pages
 * Targets: Load time < 1 second
 */
const productCacheMiddleware = async (req, res, next) => {
    const { productId } = req.params;
    const cacheKey = `product:${productId}`;

    try {
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        // Intercept response to cache it
        const originalJson = res.json;
        res.json = (body) => {
            client.setEx(cacheKey, 3600, JSON.stringify(body)); // 1 hour TTL
            return originalJson.call(res, body);
        };

        next();
    } catch (err) {
        console.error('Redis Error:', err);
        next(); // Fallback to DB
    }
};

/**
 * Real-time Inventory Reservation
 * Prevents overselling during checkout process
 */
const reserveInventory = async (productId, quantity) => {
    const inventoryKey = `inventory:${productId}`;
    
    // Atomic decrement with check
    const script = `
        local current = redis.call('GET', KEYS[1])
        if not current or tonumber(current) < tonumber(ARGV[1]) then
            return -1
        end
        return redis.call('DECRBY', KEYS[1], ARGV[1])
    `;

    const result = await client.eval(script, {
        keys: [inventoryKey],
        arguments: [quantity.toString()]
    });

    return result; // -1 if failed, >= 0 if successful
};

module.exports = { productCacheMiddleware, reserveInventory };
