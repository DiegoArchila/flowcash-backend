const { ValidationError, where, Op } = require("sequelize");
const db = require("../../database/models");
const encrypt = require("../../utils/encrypt");
const jwt = require("../../utils/jwt");


const userServices={};

userServices.login= async(email, password)=>{

    const user = await db.users.findOne({ 
        
        where: {
            email: {[Op.iLike]:email}
        },

        attributes: ['id', 'email', 'password']
    });

    if (encrypt.verify(user.password, password)) {

        const token= await jwt.sign(user.id);

        console.log("mi Id ", user.id)

        console.log("Se genero token? ", token)
        
        return token;

    } else {

        throw new Error("Error: email o password is wrong");
        
    }

}

module.exports= userServices;