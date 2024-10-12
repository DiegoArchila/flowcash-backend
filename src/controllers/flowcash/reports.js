const servicesReports = require("../../services/flowcash/reports");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const controllerReport = {};

/**
 * get Report
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
controllerReport.getReport = async(req,res)=>{

    try {
        
        const result=await servicesReports.getBalances();
        
        if(!result?.errors){
            return res.status("201").json(result);
        }else{
            return res.status(500).json(result);
        }
    } catch (error) {
        console.log("An error in found while is creating the register:\n", error);
        return res.status(500).send(error.errors || error);
    }

};

module.exports=controllerReport;