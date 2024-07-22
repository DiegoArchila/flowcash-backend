const { Sequelize } = require("sequelize");

/**
 * Middleware for handling errors
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @param {Error} error
 */
function Errors (error,req,res,next) {
    if (error instanceof Sequelize.ValidationError){
        return res.status(400).json({
            
        });
    }
}


module.exports=Errors;