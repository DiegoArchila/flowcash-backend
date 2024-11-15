const { ValidationError, where, Model } = require("sequelize");
const db = require("../../database/models");
const encrypt = require("../../utils/encrypt");

const usersAdminServices={};

usersAdminServices.create= async(newUser)=>{
        
        await db.users.create({
            names: newUser.names,
            dnitype_id: newUser.dnitype_id,
            dninumber: newUser.dninumber,
            role_id: newUser.role_id,
            username: newUser.username,
            email: newUser.email,
            password: await encrypt.hash(newUser.password),
            notes: newUser.notes || null
        });
};

usersAdminServices.update = async (updateUser, id) => {

    const user = await db.users.findByPk(id);

    if (!user) {
        throw new ValidationError(`Don't found the register with id ${id}`);
    }

    user.names=updateUser.names;
    user.dnitype_id=updateUser.dnitype_id;
    user.dninumber=updateUser.dninumber;
    user.role_id=updateUser.role_id;
    user.username=updateUser.username;
    user.email=updateUser.email;
    user.isActive=updateUser.isActive;
    user.notes=updateUser.notes;

    const updated = await user.save();

    if (!updated) {
        throw new ValidationError(`Failed to update the register with ID \"${id}\", is possible that it's not exists, or some field is incorrect.`)
    }

};

usersAdminServices.updatePassword = async (updateUser, id) => {

    const user = await db.users.findByPk(id);

    if (!user) {
        throw new ValidationError(`Don't found the register with id ${id}`);
    }

    const hashed= await encrypt.hash(updateUser.password)

    user.password=hashed;

    const updated = await user.save();

    if (!updated) {
        throw new ValidationError(`Failed to update the register with ID \"${id}\", is possible that it's not exists, or some field is incorrect.`)
    }

};

usersAdminServices.getAlls = async (page, count) => {

    let results = {};

    if (page && count) {

        results = await db.users.findAndCountAll(
            {
                attributes:['id','names','dnitype_id', 'dninumber', 'role_id', 'username', 'email','isActive','notes'],
                include: [
                    { model: db.dnitypes, as: 'dnitype' },
                    { model: db.roles, as: 'role' }
                ],
                limit: count,
                offset: (page - 1) * count,
                order: [
                    ['names', 'ASC']
                ]
            }
        );

    } else {
        results = await db.users.findAndCountAll({
            attributes:['id','names','dnitype_id', 'dninumber', 'role_id', 'username', 'email','isActive','notes'],
            include: [
                { model: db.dnitypes, as: 'dnitype' },
                { model: db.roles, as: 'role' }
            ],
            order: [
                ['names', 'ASC']
            ]
        });
        return {
            count: results.row,
            data: results
        }
    }

    console.log("Encontre usuarios: ",results)

    return {
        currentPage: parseInt(page),
        totalPages: Math.ceil(results.count / count),
        totalRow: results.count,
        data: results.rows
    }

};

usersAdminServices.findById= async(id)=>{

    const found = await db.users.findByPk(id,{
        attributes:['id','names','dnitype_id', 'dninumber', 'role_id', 'username', 'email','isActive','notes'],
            include: [
                { model: db.dnitypes, as: 'dnitype' },
                { model: db.roles, as: 'role' }
            ]
    });
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};


module.exports= usersAdminServices;