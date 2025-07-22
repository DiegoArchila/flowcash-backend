const rolesAdminServices = require("../../../services/admin/rolesAdminServices");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const rolesAdminController = {};

/**
 * Create a new role
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
rolesAdminController.create = async(req,res)=>{

    try {
        
        const created=await rolesAdminServices.create(req.body.newRole);
        
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

/**
 * Update a role
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
rolesAdminController.update = async(req,res)=>{

    try {
        
        await rolesAdminServices.update(req.body.updateRole, Number.parseInt(req.params.id));

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

/**
 * Delete a role field, but IT NOT ALLOWED
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
rolesAdminController.delete = async(req,res)=>{

    try {
        
        await rolesAdminServices.delete(Number.parseInt(req.params.id));

        return res.status(200).json({
            message:`the register ${req.params.id} it was deleted successfuly`
        });
    } catch (error) {
        
        if(error instanceof ValidationError){
            return res.status(400).json({
                error:error.message
            });
        }

        if(error instanceof ForeignKeyConstraintError){
            return res.status(500).json({
                error:error.message
            });
        }
        
        return res.status(500).json({error});
    }
};

/**
 * Get all data from roles
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
rolesAdminController.getAlls = async(req,res)=>{

    try {
        
        const results = await rolesAdminServices.getAlls(
            Number.parseInt(req.query?.page),
            Number.parseInt(req.query?.count)
        );

        console.log("RolesAdminController.getAlls: ", results);
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

/**
 * Find a register for its ID
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
rolesAdminController.findById = async(req,res)=>{

    try {
        const found = await rolesAdminServices.findById(Number.parseInt(req.params.id));
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



module.exports=rolesAdminController;