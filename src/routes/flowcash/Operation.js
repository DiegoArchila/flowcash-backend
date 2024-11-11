const express = require("express");
const router = express.Router();

const controllerOperation = require("../../controllers/flowcash/operation");

/**
* PATHS for /flowcash/operation/create
*/

router
.post("/api/flowcash/operation/create", controllerOperation.create)
.post("/api/flowcash/operation/:id/update", controllerOperation.update)
.delete("/api/flowcash/operation/:id/delete", controllerOperation.delete)
.get("/api/flowcash/operation/:id", controllerOperation.findById)
.get("/api/flowcash/operation/", controllerOperation.getAlls);

module.exports=router;