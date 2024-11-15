const { ValidationError, where, Op } = require("sequelize");
const db = require("../../database/models");
const encrypt = require("../../utils/encrypt");
const tokenJWT = require("../../utils/jwt");


const userServices={};

/**
 * Logs in a user using their email and password.
 *
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} - A Promise that resolves to the generated JWT token on successful login, or rejects with an error if the login fails.
 * @throws {Error} - Throws an error if the email or password is incorrect.
 */
userServices.login= async(email, password)=>{

    const user = await db.users.findOne({ 
        
        where: {
            email: {[Op.iLike]:email}
        },

        attributes: ['id', 'email', 'password']
    });

    if (await encrypt.verify(user.password, password)) {

        const token=tokenJWT.sign(user.id);
        
        return token;

    } else {

        throw new Error("Error: email o password is wrong");
        
    }

}

module.exports= userServices;