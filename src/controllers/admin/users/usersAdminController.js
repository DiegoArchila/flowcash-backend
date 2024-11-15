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

usersAdminController.update = async(req,res)=>{

    try {
        
        await usersAdminServices.update(req.body.updateUser, req.params.id);

        return res.status(200).json({
            message:`the register \"${req.params.id}\" has updated`
        });
    } catch (error) {
        console.error(error);

        if (error instanceof ValidationError) {
            return res.status(500).json({
                message:error.errors
            });
        }

        return res.status(500).json({
            message:error
        });
    }

};

usersAdminController.updatePassword = async(req,res)=>{

    try {
        
        await usersAdminServices.updatePassword(req.body.updateUser, req.params.id);

        return res.status(200).json({
            message:`the register \"${req.params.id}\" has updated`
        });
    } catch (error) {
        console.error(error);

        if (error instanceof ValidationError) {
            return res.status(500).json({
                message:error.errors
            });
        }

        return res.status(500).json({
            message:error
        });
    }

};

usersAdminController.getAlls = async(req,res)=>{

    try {
        
        const results = await usersAdminServices.getAlls(
            Number.parseInt(req.query?.page),
            Number.parseInt(req.query?.count)
        );

        return res.status(200).json(results);
    } catch (error) {
        
        console.error(
            "An error is found while the system try find all data: \n", 
            error
        );
        
        return res.status(500).json({
            error:error.message
        })
    }

};

usersAdminController.findById = async(req,res)=>{

    try {
        const found = await usersAdminServices.findById(req.params.id);
        return res.status(200).json({
            data:found
        });     
    } catch (error) {
        console.error(
            "An error is found while the system try find a role field: \n", 
            error
        );

        if (error instanceof ValidationError) {
            return res.status(400).json({
                error:error.message
            });
        }

        return res.status(500).json({
            error:error.message
        });
    }

};


module.exports=usersAdminController;