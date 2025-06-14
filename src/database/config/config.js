require('dotenv').config(); // Load environment variables from .env file

const config = {

  // --- Development Environment Configuration ---
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE, // Provide a fallback if env var is missing
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log // Enable logging of SQL queries in development
  },


  // --- Test Environment Configuration ---
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE, // Provide a fallback if env var is missing
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false // Enable logging of SQL queries in development
  },


  // --- Production Environment Configuration ---
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE, // Provide a fallback if env var is missing
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false // Enable logging of SQL queries in development
    // Optionally add SSL configuration for production if your DB requires it
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false // Set to true for self-signed certificates or specific CAs
    //   }
    // }
  }
};

module.exports = config;
