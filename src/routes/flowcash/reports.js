const express = require("express");
const router = express.Router();

const controllerReports = require("../../controllers/flowcash/reports");

router
    .get("/api/flowcash/reports", controllerReports.getReport)

module.exports=router;