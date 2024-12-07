const usersAdminServices = require("../services/admin/usersAdminServices");
const { decode } = require("../utils/jwt");


const adminValidating = {};

/**
 * Validates user authorization based on a provided token in the Authorization header.

 * This middleware function checks for the `Authorization` header in the request, extracts the token, and verifies it using the `verify` function.
 * If the token is valid, the middleware proceeds to the next handler in the route chain.
 * Otherwise, an appropriate error response is sent.

 * @param {import("express").Request} req - The Express request object.
 * @param {import("express").Response} res - The Express response object.
 * @param {import("express").NextFunction} next - The   
 Express next function to call when middleware completes successfully.
 * @returns {void} - Does not explicitly return a value, but may send an error response to the client.
 */
adminValidating.isAdmin = async (req, res, next)=>{

    try {
        
        const { authorization } = req.headers;
    
        if (authorization) {
    
            const token = authorization.split(' ')[1];
    
            const tokenDecoded = decode(token);

            if (await usersAdminServices.isAdmin(tokenDecoded.payload.id)) {
                req.body.id=tokenDecoded.payload.id;
                next();
            }
        }

    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }


}

module.exports = adminValidating;