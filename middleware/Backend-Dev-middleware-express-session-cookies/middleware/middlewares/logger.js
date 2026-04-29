import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, "../logs/requests.log");

export const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        const log = `${new Date().toISOString()} | ${req.method} ${
            req.originalUrl
        } | ${res.statusCode} | ${duration}ms\n`;

        fs.appendFile(logFilePath, log, (err) => {
            if (err) console.error("Logging error:", err);
        });
    });

    next();
};