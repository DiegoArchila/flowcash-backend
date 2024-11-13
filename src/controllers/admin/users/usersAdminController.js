const usersAdminServices = require("../../../services/admin/usersAdminServices");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const usersAdminController = {};

/**
 * Create a new User
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
usersAdminController.create = async(req,res)=>{

    try {
        
        const created=await usersAdminServices.create(req.body.newUser);
        
        if(!created?.errors){
            return res.status("201").json(created);
        }else{
            return res.status(500).json(created);
        }
    } catch (error) {
        console.log("An error in found while is creating the register:\n", error);
        return res.status(500).send(error.errors || error);
    }

};


module.exports=usersAdminController;