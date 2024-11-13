const { ValidationError, where } = require("sequelize");
const db = require("../../database/models");

const dnitypesAdminServices = {};

dnitypesAdminServices.create = async (newDnitype) => {

    await db.dnitypes.create({
        name: newDnitype.name,
        description: newDnitype.description,
    });
};

dnitypesAdminServices.update = async (updateDnitype, id) => {

    const dnitype = await db.dnitypes.findByPk(id);

    if (!dnitype) {
        throw new ValidationError(`Don't found the register with id ${id}`);
        
    }

    dnitype.name=updateDnitype.name;
    dnitype.description=updateDnitype.description;

    const updated = await dnitype.save();

    if (!updated) {
        throw new ValidationError(`Failed to update the register with ID \"${id}\", is possible that it's not exists, or some field is incorrect.`)
    }

};

dnitypesAdminServices.delete = async (id) => {

    // First we validating if the register exists
    const found = await db.dnitypes.findByPk(id);

    if (!found) {
        throw new ValidationError(`an error is ocurred while the system tried delete a register ${id}, its not found`,
            `the register ${id} is not found`);
    }

    const response = await db.dnitypes
        .destroy({
            where: {
                id: id
            }
        });

    if (response === 0) {
        throw new Error(`Failed to delete the register with id ${id}`);
    }
};


dnitypesAdminServices.getAlls = async (page, count) => {

    let results = {};

    if (page && count) {

        results = await db.dnitypes.findAndCountAll(
            {
                limit: count,
                offset: (page - 1) * count,
                order: [
                    ['id', 'ASC']
                ]
            }
        );

    } else {
        results = await db.dnitypes.findAndCountAll({
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

dnitypesAdminServices.findById= async(id)=>{

    const found = await db.dnitypes.findByPk(id);
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};


module.exports = dnitypesAdminServices;