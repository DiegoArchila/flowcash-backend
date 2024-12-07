const express = require("express");
const router = express.Router();

const balancePeriodAdminController = require("../../../controllers/admin/flowcash/balancePeriodAdminController");

router

    .post("/api/admin/flowcash/balance/create", balancePeriodAdminController.create)


module.exports=router;