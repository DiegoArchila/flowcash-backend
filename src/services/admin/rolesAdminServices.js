const { ValidationError, where } = require("sequelize");
const db = require("../../database/models");

const rolesAdminServices = {};

rolesAdminServices.create = async (newRole) => {

    await db.roles.create({
        name: newRole.name,
        description: newRole.description,
    });
};

rolesAdminServices.update = async (updateRole, id) => {

    const role = await db.roles.findByPk(id);

    if (!role) {
        throw new ValidationError(`Don't found the register with id ${id}`);
        
    }

    role.name=updateRole.name;
    role.description=updateRole.description;

    const updated = await role.save();

    if (!updated) {
        throw new ValidationError(`Failed to update the register with ID \"${id}\", is possible that it's not exists, or some field is incorrect.`)
    }
};

rolesAdminServices.delete = async (id) => {

    // First we validating if the register exists
    const found = await db.roles.findByPk(id);

    if (!found) {
        throw new ValidationError(`an error is ocurred while the system tried delete a register ${id}, its not found`,
            `the register ${id} is not found`);
    }

    const response = await db.roles
        .destroy({
            where: {
                id: id
            }
        });

    console.log("Response while try found the id: ", response);

    if (response === 0) {
        throw new Error(`Failed to delete the register with id ${id}`);
    }
};


rolesAdminServices.getAlls = async (page, count) => {

    let results = {};

    if (page && count) {

        results = await db.roles.findAndCountAll(
            {
                limit: count,
                offset: (page - 1) * count,
                order: [
                    ['id', 'ASC']
                ]
            }
        );

    } else {
        results = await db.roles.findAndCountAll({
            order: [
                ['id', 'ASC']
            ]
        });
        return {
            count: results.row,
            data: results
        }
    }

    return {
        currentPage: parseInt(page),
        totalPages: Math.ceil(results.count / count),
        totalRow: results.count,
        data: results.rows
    }

};

rolesAdminServices.findById= async(id)=>{

    const found = await db.roles.findByPk(id);
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};


module.exports = rolesAdminServices;