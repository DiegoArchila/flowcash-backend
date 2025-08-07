const express = require("express");
const router = express.Router();

const ReportsbalancesPeriodsAdminController = require("../../../controllers/admin/flowcash/ReportsbalancesPeriodsAdminController");

router

    .post("/api/admin/flowcash/reports/create", ReportsbalancesPeriodsAdminController.create)
    .get("/api/admin/flowcash/balance", ReportsbalancesPeriodsAdminController.getAll)
    .get("/api/admin/flowcash/balance/:balance_document", ReportsbalancesPeriodsAdminController.findByBalanceDocument)


module.exports=router;