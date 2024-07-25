const { ValidationError } = require("sequelize");
const db = require("../../database/models");

const operationTypeServices={};


/**
 * Search an operation_type field by its ID
 * @param {String|number} id 
 * @returns single model operation_type found
 */
operationTypeServices.findById=async(id)=>{
    
    const found = await db.operation_type.findByPk(id);
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;
};


/**
 * Update a new operation_type field
 * @param {{}} newOperationType 
 * @returns 
 */
operationTypeServices.create=async(newOperationType) => {

    const response = await db.operation_type.create({
        type: newOperationType.type,
        is_sum: newOperationType.is_sum,
        notes: newOperationType.notes
    });         

};


/**
 * Update a operation_type field
 * @param {any} updateOperationType
 * @param {number} id
 * @returns 
 */
operationTypeServices.update=async(updateOperationType, id) => {

    const updated = await db.operation_type
        .update({
            type:updateOperationType.type,
            is_sum:updateOperationType.is_sum,
            notes:updateOperationType.notes
        },{
            where: {
                id:id
            }
        });
  
    if (updated===0) {
        throw new ValidationError(`failed to update the register with ID \"${id}\", is possible that it's not exists, or some field is incorrect.`)
    }
    
    return updated;

};

/**
 * Delete a operation_type field
 * @param {String|number} id
 * @returns {Promise<void>}
 * @throws {ValidationError|Error}
*/
operationTypeServices.delete=async(id) => {

    // First we validating if the register exists
    const found = await db.operation_type.findByPk(id);

    if (!found) {
        throw new ValidationError(`an error is ocurred while the system tried delete a register ${id}, its not found`,
            `the register ${id} is not found`);
    }
    
    const response = await db.operation_type
        .destroy({where:{
            id:id
        }});
    
    console.log("Response while try found the id: ", response);

    if (response===0) {
        throw new Error(`Failed to delete the register with id ${id}`);
    } 

};

/**
 * find alls registers
 * @param {String|number} id
 * @returns {Promise<void>}
 * @throws {ValidationError|Error}
*/
operationTypeServices.getAlls=async(page, count) => {


    let results={};

    if (page && count) {

        results = await db.operation_type.findAndCountAll(
            {
                limit: count,
                offset: (page-1) * count
            }
        );

    } else {
        results = await db.operation_type.findAndCountAll();
        return {
            data: results
        }
    }

    return {
        currentPage: parseInt(page), 
        totalPages: Math.ceil(results.count / count), 
        totalRow: results.count,
        data: results.rows
    }

}


module.exports=operationTypeServices;