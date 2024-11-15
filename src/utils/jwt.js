require("dotenv").config();

const jsonwebtoken= require("jsonwebtoken");

const JWT = {};

/**
 * Generates a signed JSON Web Token (JWT) for a given user ID.
 * 
 * @param {string} id - The user ID to be encoded within the JWT payload.
 * @returns {string} A signed JWT string with the specified payload and expiration time.
 */
JWT.sign = async (id) =>{

    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

    const token = jsonwebtoken.sign(

        {
            id:id
        },

        process.env.JWT_SECRET_KEY || "caracolas",
        
        {
            expiresIn:process.env.JWT_TIMEOUT || '1d'
        }

    );

    console.log("Estoy firmando? estoy dento de JWT Utils, este el el id ", id)

    return token;
    
};

/**
 * Verifies and decodes a JSON Web Token (JWT).
 * 
 * @param {string} token - The JWT to verify.
 * @returns {object | boolean} Returns the decoded token object if valid, or `false` if the token is invalid or expired.
 */
JWT.sign = (token) =>{

    return jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY, (err, decoded) =>{
    
        if(err){
            return false;
        } else {
            return true;
        }
    
    });
};

module.exports= JWT;