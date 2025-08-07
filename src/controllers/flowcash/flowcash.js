const servicesFlowcash = require("../../services/flowcash/flowcash");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const controllerFlowcash = {};

/**
 * Create a new flowcash
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerFlowcash.create = async(req,res)=>{

    try {
        
        await servicesFlowcash.create(req.body.NewFlowcash, req.user);

        return res.status(201).send({
            message: "The register has been created successfuly"
        });
    } catch (error) {
        console.log("An error in found while is creating the register:\n", error);
        return res.status(500).send(error.errors || error);
    }

};


/**
 * Update a flowcash
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerFlowcash.update = async(req,res)=>{

    try {
        
        const updated=await servicesFlowcash.update(req.body.updateFlowcash, Number.parseInt(req.params.id));

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
 * Delete a flowcash field, but IT NOT ALLOWED
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerFlowcash.delete = async(req,res)=>{

    try {
        
        await servicesFlowcash.delete(Number.parseInt(req.params.id));

        return res.status(200).json({
            message:`the register ${req.params.id} it was deleted successfuly`
        });
    } catch (error) {
        console.error(
            "An error is found while the system try delete a flowcash field: \n", 
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
 * Get all data from flowcash
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerFlowcash.getAllsCurrentPeriod = async(req,res)=>{

    try {
        
        const results = await servicesFlowcash.getAllsCurrentPeriod(
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
controllerFlowcash.findById = async(req,res)=>{

    try {
        const found = await servicesFlowcash.findById(Number.parseInt(req.params.id));
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

module.exports=controllerFlowcash;