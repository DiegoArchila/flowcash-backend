const balancePeriodAdminServices = require("../../../services/admin/flowcash/balancePeriodAdminServices");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");
const db = require("../../../database/models");


const balancePeriodAdminController = {};

/**
 * Create a new flowcash
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
balancePeriodAdminController.create = async(req,res)=>{

    const transaction = await db.sequelize.transaction();

    try {
        
        const created=await balancePeriodAdminServices.create(
            req.body.id, 
            req.body.notes || null, 
            transaction);

        await transaction.commit();
        
        if(!created?.errors){
            return res.status("201").json(created);
        }else{
            return res.status(500).json(created);
        }

    } catch (error) {
        await transaction.rollback();
        return res.status(500).send(
            error.message || error
        );
    }

};

balancePeriodAdminController.getAll = async (req, res) => {

    try {
        
        const result=await balancePeriodAdminServices.findAll(
            Number.parseInt(req.query?.page),
            Number.parseInt(req.query?.count)
        );

        
        if(!result?.errors){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(result);
        }

    } catch (error) {
        return res.status(500).send(
            error.message || error
        );
    }

};

balancePeriodAdminController.findByBalanceDocument = async (req, res) => { 

    try {
        const found = await balancePeriodAdminServices.findByBalanceDocument(req.params.balance_document);

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

module.exports=balancePeriodAdminController;