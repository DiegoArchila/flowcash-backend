const servicesOperationType = require("../../services/flowcash/operation_type");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");

const controllerOperationType = {};

/**
 * Create a new operation type field
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<import("express").Response>}
 */
controllerOperationType.create=async(req, res)=>{

    try {

        const created=await servicesOperationType.create(req.body.NewOperationType);
        
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
 * Update a operation type field
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Promise<import("express").Response>}
 */
controllerOperationType.update=async(req,res)=>{
    try {
        
        const updated=await servicesOperationType.update(req.body.updateOperationType, Number.parseInt(req.params.id));

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
}

/**
 * Delete a operation type field
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<import("express").Response>}
 */
controllerOperationType.delete=async(req,res)=>{

    try {

        await servicesOperationType.delete(Number.parseInt(req.params.id));

        return res.status(200).json({
            message:`the register ${req.params.id} it was deleted successfuly`
        });
        
    } catch (error) {
        console.error(
            "An error is found while the system try delete a operation_type field: \n", 
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

}

/**
 * Find a register for its ID
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Promise<import("express").Response>}
 */
controllerOperationType.findById=async(req,res)=>{
    
    try {
        const found = await servicesOperationType.findById(Number.parseInt(req.params.id));
        return res.status(200).json({
            data:found
        });   
    } catch (error) {
        console.error(
            "An error is found while the system try find a operation_type field: \n", 
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
}

/**
 * Get alls registers
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Promise<import("express").Response>}
 */
controllerOperationType.getAlls=async(req,res)=>{
    try {

        const results = await servicesOperationType.getAlls(
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
}

module.exports=controllerOperationType;