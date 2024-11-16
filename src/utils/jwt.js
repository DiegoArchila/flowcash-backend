require("dotenv").config();

const jsonwebtoken= require("jsonwebtoken");

const token = {};

/**
 * Generates a signed JSON Web Token (JWT) for a given user ID.
 * 
 * @param {string} id - The user ID to be encoded within the JWT payload.
 * @returns {string} A signed JWT string with the specified payload and expiration time.
 */
token.sign = (id) =>{

    const token = jsonwebtoken.sign(

        {
            id:id
        },

        process.env.JWT_SECRET_KEY,
        
        {
            expiresIn:process.env.JWT_TIMEOUT
        }

    );

    return token;
    
};

/**
 * Verifies and decodes a JSON Web Token (JWT).
 * 
 * @param {string} token - The JWT to verify.
 * @returns {object | boolean} Returns the decoded token object if valid, or `false` if the token is invalid or expired.
 */
token.verify = (token) =>{

    return jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY, (err, decoded) =>{
    
        if(err){
            throw new Error("Error: token expired or invalid");
        } 
        
        return true;
   
    });
};

/**
 * Decodes a JSON Web Token (JWT) into an object containing the decoded payload and header.

 * **Important Note:** This function does **not** verify the signature of the JWT. It simply decodes the token's content.

 * @async
 * @param {string} token - The JWT to be decoded.
 * @returns {Promise<Object>} - A Promise that resolves to an object containing the decoded payload and header.
 */
token.decode = (token) =>{
    return jsonwebtoken.decode(token, {complete:true});
};

module.exports= token;