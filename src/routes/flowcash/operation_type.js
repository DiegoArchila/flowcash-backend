const express = require("express");
const router = express.Router();

const controllerOperationType = require("../../controllers/flowcash/operation_type");

/**
* PATHS for /flowcash/operationtype/create
*/

router
.post("/api/flowcash/operationtype/create", controllerOperationType.create)
.post("/api/flowcash/operationtype/:id/update", controllerOperationType.update)
.delete("/api/flowcash/operationtype/:id/delete", controllerOperationType.delete)
.get("/api/flowcash/operationtype/:id", controllerOperationType.findById)
.get("/api/flowcash/operationtype", controllerOperationType.getAlls);

module.exports=router;