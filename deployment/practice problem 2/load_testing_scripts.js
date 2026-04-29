import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * K6 Load Test Script
 * Target: 500,000 requests per minute
 * 500,000 / 60 = ~8,333 Requests Per Second (RPS)
 */

export const options = {
    stages: [
        { duration: '5m', target: 1666 },  // Ramp up to 100k req/min
        { duration: '10m', target: 1666 }, // Stay at 100k
        { duration: '5m', target: 8333 },  // Ramp up to 500k req/min
        { duration: '20m', target: 8333 }, // Peak load for 20 mins
        { duration: '5m', target: 0 },    // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% of product pages < 1s
        'http_req_duration{type:checkout}': ['p(95)<3000'], // Checkout < 3s
    },
};

export default function () {
    const BASE_URL = 'https://ecommerce-platform-peak.herokuapp.com';

    // 1. Browse Product (80% of traffic)
    const productRes = http.get(`${BASE_URL}/api/products/123`);
    check(productRes, { 'status is 200': (r) => r.status === 200 });

    sleep(1);

    // 2. Search (15% of traffic)
    const searchRes = http.get(`${BASE_URL}/api/search?q=black-friday`);
    check(searchRes, { 'search success': (r) => r.status === 200 });

    // 3. Checkout (5% of traffic)
    if (Math.random() < 0.05) {
        const payload = JSON.stringify({ productId: 123, quantity: 1 });
        const params = { headers: { 'Content-Type': 'application/json' }, tags: { type: 'checkout' } };
        const checkoutRes = http.post(`${BASE_URL}/api/checkout`, payload, params);
        check(checkoutRes, { 'checkout success': (r) => r.status === 201 || r.status === 202 });
    }

    sleep(0.5);
}
