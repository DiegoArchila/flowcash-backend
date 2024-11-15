const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/user/usersController");

router
    .post("/api/flowcash/login", usersController.login)

module.exports=router;