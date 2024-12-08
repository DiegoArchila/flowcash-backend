const express = require("express");
const router = express.Router();

const balancePeriodAdminController = require("../../../controllers/admin/flowcash/balancePeriodAdminController");

router

    .post("/api/admin/flowcash/balance/create", balancePeriodAdminController.create)
    .get("/api/admin/flowcash/balance", balancePeriodAdminController.getAll)
    .get("/api/admin/flowcash/balance/:balance_document", balancePeriodAdminController.findByBalanceDocument)


module.exports=router;