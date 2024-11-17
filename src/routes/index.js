const express = require("express");
const router = express.Router();
const { isUser } = require("../middlewares/usersMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

/** Imports the routes files */

/**[Public]*/
const publicRoutes = require("./public/publicRoutes");

router.use(publicRoutes);

/**[FLOWCASH]*/
const operation_type =require("./flowcash/Operation_type");
const operation =require("./flowcash/Operation");
const flowcash_type =require("./flowcash/Flowcash_type");
const flowcash =require("./flowcash/Flowcash");
const reports =require("./flowcash/Reports");

router.use(isUser); //Added layer for validation if is a user
router.use(reports);
router.use(operation_type);
router.use(operation);
router.use(flowcash_type);
router.use(flowcash);

/**[Admin]*/
const adminRoutes = require("./admin/usersAdminRoutes");

router.use(isAdmin); //Added layer for validation if is a ADMIN
router.use(adminRoutes);

/**[Users]*/
// const userRoutes = require("./user/userRoutes");

// router.use(isUser) //Protect this section routes
// router.use(userRoutes);


module.exports=router;