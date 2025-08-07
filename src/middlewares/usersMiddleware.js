const { verify, decode } = require("../utils/jwt");

const usersValidating = {};

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
usersValidating.isUser = (req, res, next)=>{

    try {
        
        const { authorization } = req.headers;
    
        if (authorization) {
    
            const token = authorization.split(' ')[1];
    
            if (verify(token)){

                const {payload} = decode(token);
                if (!payload || !payload.id) {
                    throw new Error('invalid token');
                }

                req.user = payload.id;
                next();
            } 
        } else {
            res.status(401).json({
                message: 'token not provided'
            });
        }

    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }


}

module.exports = usersValidating;