const usersServices = require("../../services/users/usersServices");
const { ValidationError, ForeignKeyConstraintError } = require("sequelize");


const usersController = {};

/**
 * Login user
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @returns {Response}
 */
usersController.login = async(req,res)=>{

    const { login } = req.body;



    try {
        
        const isValidLogin=await usersServices.login(login.email, login.password);
        
        return res.status(201).json({
            isValidLogin
        });
        
    } catch (error) {
        return res.status(401).send(error.errors || error);
    }

};

module.exports= usersController;