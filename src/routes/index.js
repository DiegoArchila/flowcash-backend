const express = require("express");
const router = express.Router();

/** Imports the routes files */

/**[FLOWCASH]*/
const operation_type =require("./flowcash/operation_type");
const operation =require("./flowcash/operation");
const flowcash_type =require("./flowcash/flowcash_type");
const flowcash =require("./flowcash/flowcash");

router.use(operation_type);
router.use(operation);
router.use(flowcash_type);
router.use(flowcash);

module.exports=router;