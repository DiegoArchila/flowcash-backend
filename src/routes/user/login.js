const express = require("express");
const router = express.Router();

const controllerFlowcash_type = require("../../controllers/flowcash/flowcash_type");

router
    .post("/api/flowcash/login", controllerFlowcash_type.create)

module.exports=router;