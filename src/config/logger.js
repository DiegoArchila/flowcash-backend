// config/logger.js
const winston = require('winston');
const path = require('path');

// Define custom log levels, ordered by severity (lower number = higher severity)
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};

// Define custom colors for log levels in development console output (optional)
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'white',
};

// Add the custom colors to Winston for console output
winston.addColors(colors);

// Define the common log format for all transports
const format = winston.format.combine(
    // Add a timestamp to each log entry
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Include stack trace for error logs, crucial for debugging
    winston.format.errors({ stack: true }),
    // Allows for string interpolation (e.g., logger.info('User: %o', userObject))
    winston.format.splat(),
    // Output logs in JSON format for structured logging (ideal for log aggregation)
    winston.format.json()
);

// Array to hold different transports (where logs will be sent)
const transports = [];

// --- Development Environment Configuration ---
// Logs are primarily sent to the console with detailed debug information.
if (process.env.NODE_ENV === 'development') {
    transports.push(
        new winston.transports.Console({
            // Log level for development: 'debug' logs everything from debug up
            level: 'debug', 
            format: winston.format.combine(
                // Add colors to console output for better readability
                winston.format.colorize({ all: true }),
                // Custom format for console output
                winston.format.printf(
                    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
                )
            ),
        })
    );
    console.log('Logger configured for development: Console (debug level)');
}
// --- Production Environment Configuration ---
// Logs are sent to console (info level) and persistent files (error and combined logs).
else if (process.env.NODE_ENV === 'production') {
    transports.push(
        new winston.transports.Console({
            // Log level for production console: 'info' logs information, warnings, and errors
            level: 'info', 
            format: winston.format.combine(
                // Simple format for production console, no colors
                winston.format.printf(
                    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
                )
            ),
        }),
        new winston.transports.File({
            // File to store only error logs
            filename: path.join(__dirname, '../logs/error.log'), 
            // Only log messages with 'error' level
            level: 'error', 
            // JSON format for file logs
            format: winston.format.json() 
        }),
        new winston.transports.File({
            // File to store all logs from 'info' level up
            filename: path.join(__dirname, '../logs/combined.log'), 
            // Log messages from 'info' level up
            level: 'info', 
            // JSON format for file logs
            format: winston.format.json() 
        })
        // Additional transports for production can be added here, such as:
        // - winston-daily-rotate-file: For daily log file rotation to manage file size
        // - winston-mongodb, winston-cloudwatch, etc.: For sending logs to external logging services
    );
    console.log('Logger configured for production: Console (info), Files (error, combined)');
}
// --- Testing Environment Configuration (Optional) ---
// Logs are sent to console with only warnings and errors to avoid cluttering test output.
else if (process.env.NODE_ENV === 'test') {
    transports.push(
        new winston.transports.Console({
            // Log level for testing: 'warn' logs warnings and errors
            level: 'warn', 
            format: winston.format.combine(
                winston.format.printf(
                    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
                )
            ),
        })
    );
    console.log('Logger configured for testing: Console (warn)');
}

// Create the Winston logger instance
const logger = winston.createLogger({
    // Assign the custom log levels
    levels: levels,
    // Apply the common format to all active transports
    format: format,
    // Add the configured transports
    transports: transports,
    // Prevents the application from exiting on logging errors
    exitOnError: false, 
});

// Export the configured logger for use throughout the application
module.exports = logger;