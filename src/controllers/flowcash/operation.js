const servicesOperation = require("../../services/flowcash/operation");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const controllerOperation = {};

/**
 * Create a new operation field
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerOperation.create = async(req,res)=>{

    try {
        
        const created=await servicesOperation.create(req.body.NewOperation);
        
        if(!created?.errors){
            return res.status("201").json(created);
        }else{
            return res.status(500).json(created);
        }
    } catch (error) {
        console.log("An error in found while is creating the operation type:\n", error);
        return res.status(500).send(error);
    }

};

/**
 * Update a operation field
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerOperation.update = async(req,res)=>{

    try {
        
        const updated=await servicesOperation.update(req.body.updateOperation, req.params.id);

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
 * Delete a operation field
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerOperation.delete = async(req,res)=>{

    try {
        
        await servicesOperation.delete(req.params.id);

        return res.status(200).json({
            message:`the register ${req.params.id} it was deleted successfuly`
        });
    } catch (error) {
        console.error(
            "An error is found while the system try delete a operation field: \n", 
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
 * Get all data from Operation
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerOperation.getAlls = async(req,res)=>{

    try {
        
        const results = await servicesOperation.getAlls(
            req.query?.page,
            req.query?.count
        );

        return res.status(200).json(results);
    } catch (error) {
        
        console.error(
            "An error is found while the system try find alls data: \n", 
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
controllerOperation.findById = async(req,res)=>{

    try {
        const found = await servicesOperation.findById(req.params.id);
        return res.status(200).json({
            data:found
        });     
    } catch (error) {
        console.error(
            "An error is found while the system try find a operation field: \n", 
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



module.exports=controllerOperation;