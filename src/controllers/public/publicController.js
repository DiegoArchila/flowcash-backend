const usersServices = require("../../services/users/usersServices");
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
        
        const token=await usersServices.login(login.email, login.password);
        
        return res.status(200).json({
            token
        });
        
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }

};

module.exports= publicController;