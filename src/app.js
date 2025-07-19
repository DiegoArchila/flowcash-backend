/* --------------------------------------------------
/* IMPORTS 
-------------------------------------------------- */

// External Libraries
const path = require('path');
// set the varible environment to the start
const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} else {
  
  require('dotenv').config({ path: path.resolve(__dirname, `../.env.${env}`) });
}

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./config/logger.js");


// Internal Modules
const routes = require("./routes");

/* --------------------------------------------------
/* INITIAL SETUP 
-------------------------------------------------- */

const PORT = process.env.APP_PORT || 3000;
app.use(express.static("public"));

/* --------------------------------------------------
/* ENVIRONMENT VARIABLES CONFIGURATION
-------------------------------------------------- */

/**
 *  Set up environment-specific configurations.
 *  In development, we log requests to the console.
 *  In production, we set up CORS with allowed origins.
 *  The allowed origins are defined for production to restrict access.
 *  In development, we allow all origins.
 */
if (env === 'development') {

  console.log('Running in development mode');

  const allowedOrigins = process.env.APP_CORS ? process.env.APP_CORS_DEV.split(',') : [];
  
  app.use(cors({

    origin: process.env.APP_CORS ? process.env.APP_CORS_DEV.split(',') : [], // Allow all origins in development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]

  }));

} else if (env === 'production') {

  console.log('Running in production mode');

  // Origins allowed in production
  const allowedOrigins = process.env.APP_CORS ? process.env.APP_CORS.split(',') : [];

  app.use(cors({

    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]

  }));
}

/**
 *  Morgan is a middleware for logging HTTP requests.
 *  It logs requests in different formats based on the environment.
 */
if (env === 'development') {
  app.use(morgan('dev', {
    stream: {
      write: (message) => logger.http(message.trim())
    }
  }));
  logger.debug('Morgan configured for development (dev format).');
} else if (env === 'production') {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.http(message.trim())
    }
  }));
  logger.info('Morgan configured for production (combined format).');
}



/* --------------------------------------------------
/* MIDDLEWARE CONFIGURATION
-------------------------------------------------- */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* --------------------------------------------------
/* ROUTE HANDLING
-------------------------------------------------- */

// Assign routes from the routes module
app.use(routes);

/* --------------------------------------------------
/* START SERVER 
-------------------------------------------------- */

app.listen(PORT, () => {
  console.log("Server running in port", PORT);
});