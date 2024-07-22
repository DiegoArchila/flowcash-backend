const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

fs.readdirSync(__dirname).forEach(file => {

    /**
     * We are validating if the file found is a file .js and not is this same file "index.js"
     */
    if (file !== "index.js" && file.endsWith(".js")) {

        const route=require(path.join(__dirname, file));

        const nameRoute= file.split(".")[0];

        router.use(`/api/${nameRoute}`,route);
    }

});

module.exports=router;