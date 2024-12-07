const publicServices = require("../../services/public/publicServices");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const publicController = {};

/**
 * Login user
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Response}
 */
publicController.login = async(req,res)=>{

    const { login } = req.body;

    try {
        
        return res.status(200).json({
            data: await publicServices.login(login.email, login.password)
        });
        
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }

};

module.exports= publicController;