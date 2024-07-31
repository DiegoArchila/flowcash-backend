const express = require("express");
const router = express.Router();
const controllerOperationType = require("../controllers/flowcash/operation_type");
const controllerOperation = require("../controllers/flowcash/operation");
const controllerFlowcash_type = require("../controllers/flowcash/flowcash_type");
const controllerFlowcash = require("../controllers/flowcash/flowcash");


/**
 * The path is same the of the file .js:
 * 
 * /flowcash
 * 
 * Example for access to this path in the browser is:
 * 
 * http(s)://URLBASE:PORT/api/flowcash
 */
router

    /**
    * PATHS for /flowcash/flowcash
    */
     .post("/create", controllerFlowcash.create)
     .post("/:id/update", controllerFlowcash.update)
     .delete("/:id/delete", controllerFlowcash.delete)
     .get("/:id", controllerFlowcash.findById)
     .get("/", controllerFlowcash.getAlls)

    /**
    * PATHS for /flowcash/operationtype/create
    */
    .post("/operationtype/create", controllerOperationType.create)
    .post("/operationtype/:id/update", controllerOperationType.update)
    .delete("/operationtype/:id/delete", controllerOperationType.delete)
    .get("/operationtype/:id", controllerOperationType.findById)
    .get("/operationtype", controllerOperationType.getAlls)

    /**
    * PATHS for /flowcash/operations
    */
    .post("/operation/create", controllerOperation.create)
    .post("/operation/:id/update", controllerOperation.update)
    .delete("/operation/:id/delete", controllerOperation.delete)
    .get("/operation/:id", controllerOperation.findById)
    .get("/operation", controllerOperation.getAlls)

    /**
    * PATHS for /flowcash/flowcash_type
    */
    .post("/flowcash_type/create", controllerFlowcash_type.create)
    .post("/flowcash_type/:id/update", controllerFlowcash_type.update)
    .delete("/flowcash_type/:id/delete", controllerFlowcash_type.delete)
    .get("/flowcash_type/:id", controllerFlowcash_type.findById)
    .get("/flowcash_type", controllerFlowcash_type.getAlls)

  

module.exports=router;