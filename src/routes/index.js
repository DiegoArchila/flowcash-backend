const express = require("express");
const router = express.Router();

/** Imports the routes files */

/**[FLOWCASH]*/
const operation_type =require("./flowcash/Operation_type");
const operation =require("./flowcash/Operation");
const flowcash_type =require("./flowcash/Flowcash_type");
const flowcash =require("./flowcash/Flowcash");
const reports =require("./flowcash/Reports");

router.use(reports);
router.use(operation_type);
router.use(operation);
router.use(flowcash_type);
router.use(flowcash);

/**[Admin]*/
const adminRoutes = require("./admin/usersAdminRoutes");

router.use(adminRoutes);

/**[Users]*/
const userRoutes = require("./user/userRoutes");

router.use(userRoutes);



module.exports=router;