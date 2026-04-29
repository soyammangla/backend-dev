const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/**
 * Health Check Endpoint
 * Frequency: Every 5 minutes (via external monitor)
 */
router.get('/health', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        env: process.env.NODE_ENV,
        services: {
            database: 'unknown',
            api: 'healthy'
        }
    };

    try {
        // Check DB Connection
        const dbStatus = mongoose.connection.readyState;
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        healthcheck.services.database = dbStatus === 1 ? 'healthy' : 'unhealthy';

        if (dbStatus !== 1) {
            healthcheck.message = 'Service Degradation';
            return res.status(503).json(healthcheck);
        }

        res.status(200).json(healthcheck);
    } catch (error) {
        healthcheck.message = error.message;
        res.status(503).json(healthcheck);
    }
});

/**
 * Performance Metrics Endpoint
 * Targets: Production RPM < 10k, Latency < 200ms (P95)
 */
router.get('/metrics', (req, res) => {
    // In a real app, this would integrate with Prometheus or Datadog
    const metrics = {
        requests_per_minute: Math.floor(Math.random() * 5000), // Mock data
        p95_latency_ms: 145,
        error_rate: 0.01,
        active_connections: mongoose.connection.base.connections.length
    };
    res.json(metrics);
});

module.exports = router;
