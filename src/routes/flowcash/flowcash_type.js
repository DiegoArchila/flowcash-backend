const express = require("express");
const router = express.Router();

const controllerFlowcash_type = require("../../controllers/flowcash/flowcash_type");

router
    .post("/api/flowcash/flowcashtype/create", controllerFlowcash_type.create)
    .post("/api/flowcash/flowcashtype/:id/update", controllerFlowcash_type.update)
    .delete("/api/flowcash/flowcashtype/:id/delete", controllerFlowcash_type.delete)
    .get("/api/flowcash/flowcashtype/:id", controllerFlowcash_type.findById)
    .get("/api/flowcash/flowcashtype", controllerFlowcash_type.getAlls);

module.exports=router;