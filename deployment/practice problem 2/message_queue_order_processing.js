const Queue = require('bull');
const paymentGateway = require('./external/payment-gateway');

// Create Order Processing Queue
const orderQueue = new Queue('order-processing', process.env.REDIS_URL, {
    settings: {
        backoffStrategies: {
            exponential: (attempts) => Math.pow(2, attempts) * 1000
        }
    }
});

/**
 * Producer: Add order to queue
 * Used when payment gateway is down or during high-traffic bursts
 */
async function createOrder(orderData) {
    await orderQueue.add(orderData, {
        attempts: 5,
        backoff: {
            type: 'exponential',
            delay: 1000
        },
        removeOnComplete: true
    });
}

/**
 * Consumer: Process orders from queue
 */
orderQueue.process(async (job) => {
    const { orderId, amount, userId } = job.data;
    
    try {
        // Implement Circuit Breaker for Payment Gateway
        const transaction = await paymentGateway.process(amount);
        
        if (!transaction.success) {
            throw new Error('Payment Failed'); // Will trigger Bull's retry logic
        }

        // Update DB Order Status
        await updateOrderStatus(orderId, 'paid');
        
    } catch (error) {
        console.error(`Order ${orderId} failed:`, error.message);
        throw error; // Re-queue for retry
    }
});

/**
 * Circuit Breaker Status Check
 * If payment gateway is down, queue orders without trying immediate processing
 */
async function handleCheckout(req, res) {
    const orderData = req.body;
    
    if (paymentGateway.isDown()) {
        await createOrder(orderData);
        return res.status(202).json({ 
            message: 'Order queued for processing due to high load / gateway maintenance.',
            orderId: orderData.id 
        });
    }

    // Normal flow...
}

module.exports = { createOrder, orderQueue };
