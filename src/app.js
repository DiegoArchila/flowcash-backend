/* --------------------------------------------------
/* IMPORTS 
-------------------------------------------------- */

// External Libraries
const express = require("express");
const app = express();
const logger = require("morgan");
const dotenv = require('dotenv').config();
const cors = require("cors");

// Internal Modules
const routes=require("./routes");

/* --------------------------------------------------
/* INITIAL SETUP 
-------------------------------------------------- */

const PORT = process.env.APP_PORT || 3001;
app.use(express.static("public"));
require('dotenv').config();

/* --------------------------------------------------
/* MIDDLEWARE CONFIGURATION
-------------------------------------------------- */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors({
	origin: "https://www.mabla.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
