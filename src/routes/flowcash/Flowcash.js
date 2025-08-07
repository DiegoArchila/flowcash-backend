const express = require("express");
const router = express.Router();

const controllerFlowcash = require("../../controllers/flowcash/flowcash");

router
    .post("/api/flowcash/create", controllerFlowcash.create)
    .post("/api/flowcash/:id/update", controllerFlowcash.update)
    .delete("/api/flowcash/:id/delete", controllerFlowcash.delete)
    .get("/api/flowcash/:id", controllerFlowcash.findById)
    .get("/api/flowcash/", controllerFlowcash.getAllsCurrentPeriod);

module.exports=router;