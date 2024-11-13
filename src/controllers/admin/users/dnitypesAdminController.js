const dnitypeAdminServices = require("../../../services/admin/dnitypesAdminServices");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const dnitypeAdminController = {};

/**
 * Create a new dnitype
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
dnitypeAdminController.create = async(req,res)=>{

    try {
        
        const created=await dnitypeAdminServices.create(req.body.newDnitype);
        
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
 * Update a dnitype
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
dnitypeAdminController.update = async(req,res)=>{

    try {
        
        await dnitypeAdminServices.update(req.body.updateDnitype, req.params.id);

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
 * Delete a dnitype field, but IT NOT ALLOWED
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
dnitypeAdminController.delete = async(req,res)=>{

    try {
        
        await dnitypeAdminServices.delete(String(req.params.id));

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
 * Get all data from dnitypes
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
dnitypeAdminController.getAlls = async(req,res)=>{

    try {
        
        const results = await dnitypeAdminServices.getAlls(
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

/**
 * Find a register for its ID
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
dnitypeAdminController.findById = async(req,res)=>{

    try {
        const found = await dnitypeAdminServices.findById(req.params.id);
        return res.status(200).json({
            data:found
        });     
    } catch (error) {
        console.error(
            "An error is found while the system try find a dnitype field: \n", 
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



module.exports=dnitypeAdminController;