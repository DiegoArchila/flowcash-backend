const express = require("express");
const router = express.Router();

const dnitypeAdminController = require("../../controllers/admin/users/dnitypesAdminController");
const rolesAdminController = require("../../controllers/admin/users/rolesAdminController");
const userAdminController = require("../../controllers/admin/users/usersAdminController");

router
    // [USERS]
    .post("/api/flowcash/admin/users/create", userAdminController.create)

    // [ROLES]
    .post("/api/flowcash/admin/users/roles/create", rolesAdminController.create)
    .post("/api/flowcash/admin/users/roles/:id/update", rolesAdminController.update)
    .delete("/api/flowcash/admin/users/roles/:id/delete", rolesAdminController.delete)
    .get("/api/flowcash/admin/users/roles/:id", rolesAdminController.findById)
    .get("/api/flowcash/admin/users/roles", rolesAdminController.getAlls)

    // [DNITYPES]
    .post("/api/flowcash/admin/users/dnitypes/create", dnitypeAdminController.create)
    .post("/api/flowcash/admin/users/dnitypes/:id/update", dnitypeAdminController.update)
    .delete("/api/flowcash/admin/users/dnitypes/:id/delete", dnitypeAdminController.delete)
    .get("/api/flowcash/admin/users/dnitypes/:id", dnitypeAdminController.findById)
    .get("/api/flowcash/admin/users/dnitypes", dnitypeAdminController.getAlls)

module.exports=router;