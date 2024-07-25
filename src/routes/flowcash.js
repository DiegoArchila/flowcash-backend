const express = require("express");
const router = express.Router();
const controllerOperationType = require("../controllers/flowcash/operation_type");
const controllerOperation = require("../controllers/flowcash/operation");


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
    * PATHS for /flowcash
    */
    .get("/", (req, res)=>{
        res.send("Working");
    })

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

module.exports=router;