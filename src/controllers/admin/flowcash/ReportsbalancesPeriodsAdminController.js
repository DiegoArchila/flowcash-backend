const ReportbalancesPeriodsAdminServices = require("../../../services/admin/flowcash/ReportsbalancesPeriodsAdminServices");
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
        
        const created=await ReportbalancesPeriodsAdminServices.create(
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

        const result=await ReportbalancesPeriodsAdminServices.findAll(
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

    const transaction = await db.sequelize.transaction();

    try {
        const found = await ReportbalancesPeriodsAdminServices.findByBalanceDocument(req.params.balance_document, transaction);

        await transaction.commit();

        return res.status(200).json({
            data:found
        });
             
    } catch (error) {
        
        await transaction.rollback();

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