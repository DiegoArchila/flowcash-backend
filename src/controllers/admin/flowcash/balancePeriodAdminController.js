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
        
        const created=await balancePeriodAdminServices.findAll(
            Number.parseInt(req.query?.page),
            Number.parseInt(req.query?.count)
        );

        
        if(!created?.errors){
            return res.status("201").json(created);
        }else{
            return res.status(500).json(created);
        }

    } catch (error) {
        return res.status(500).send(
            error.message || error
        );
    }

}

module.exports=balancePeriodAdminController;