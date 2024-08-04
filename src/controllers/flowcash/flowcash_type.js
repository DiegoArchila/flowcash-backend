const servicesFlowcash_type = require("../../services/flowcash/flowcash_type");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const controllerFlowcash_type = {};

/**
 * Create a new flowcash_type
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerFlowcash_type.create = async(req,res)=>{

    try {
        
        const created=await servicesFlowcash_type.create(req.body.NewFlowcash_type);
        
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
 * Update a flowcash_type
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerFlowcash_type.update = async(req,res)=>{

    try {
        
        const updated=await servicesFlowcash_type.update(req.body.updateFlowcash_type, Number.parseInt(req.params.id));

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
 * Delete a flowcash_type field, but IT NOT ALLOWED
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerFlowcash_type.delete = async(req,res)=>{

    try {
        
        await servicesFlowcash_type.delete(Number.parseInt(req.params.id));

        return res.status(200).json({
            message:`the register ${req.params.id} it was deleted successfuly`
        });
    } catch (error) {
        console.error(
            "An error is found while the system try delete a flowcash_type field: \n", 
            error
        );
        
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
 * Get all data from flowcash_type
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerFlowcash_type.getAlls = async(req,res)=>{

    try {
        
        const results = await servicesFlowcash_type.getAlls(
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
controllerFlowcash_type.findById = async(req,res)=>{

    try {
        const found = await servicesFlowcash_type.findById(Number.parseInt(req.params.id));
        return res.status(200).json({
            data:found
        });     
    } catch (error) {
        console.error(
            "An error is found while the system try find a flowcash_type field: \n", 
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

module.exports=controllerFlowcash_type;