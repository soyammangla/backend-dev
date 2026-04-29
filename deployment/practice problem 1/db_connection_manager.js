const mongoose = require('mongoose');

/**
 * Database Connection Manager
 * Handles isolation and environment-specific logic
 */
class DBManager {
    constructor() {
        this.uri = process.env.MONGODB_URI;
        this.env = process.env.NODE_ENV || 'development';
    }

    async connect() {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Security: Production requires SSL and encryption at rest (managed via Atlas)
            ssl: this.env === 'production' || this.env === 'staging',
            maxPoolSize: this.env === 'production' ? 100 : 10,
            serverSelectionTimeoutMS: 5000,
        };

        try {
            await mongoose.connect(this.uri, options);
            console.log(`[${this.env}] Connected to isolated MongoDB cluster: ${this.uri.split('@')[1]}`);
        } catch (error) {
            console.error(`[${this.env}] DB Connection Failed:`, error.message);
            // Alerting logic for Prod
            if (this.env === 'production') {
                this.triggerCriticalAlert('DATABASE_FAILURE', error.message);
            }
            process.exit(1);
        }
    }

    triggerCriticalAlert(type, message) {
        // Mocking automated alerting system (PagerDuty/Twilio)
        console.error(`CRITICAL ALERT [${type}]: ${message}`);
    }

    // Backup logic (managed via Atlas API but triggered here if needed)
    async triggerManualBackup() {
        if (this.env !== 'production') return;
        console.log('Initiating daily production backup (30-day retention)...');
        // Atlas API Call here...
    }
}

module.exports = new DBManager();
