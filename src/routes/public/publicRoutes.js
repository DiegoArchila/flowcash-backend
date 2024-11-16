const express = require("express");
const router = express.Router();

const publicController = require("../../controllers/public/publicController");

router
    .post("/api/login", publicController.login)

module.exports=router;