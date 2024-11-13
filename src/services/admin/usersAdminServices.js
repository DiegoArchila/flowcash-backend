const { ValidationError, where } = require("sequelize");
const db = require("../../database/models");

const usersAdminServices={};

usersAdminServices.create= async(newUser)=>{
        
        await db.users.create({
            names: newUser.names,
            dnitype_id: newUser.dnitype_id,
            dninumber: newUser.dninumber,
            role_id: newUser.role_id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            notes: newUser.notes || null
        });
}

module.exports= usersAdminServices;