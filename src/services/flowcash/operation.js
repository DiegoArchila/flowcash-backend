const { ValidationError, where } = require("sequelize");
const db = require("../../database/models");


const operationServices={};

operationServices.create= async(newOperation)=>{

    const response = await db.operation.create({
        type: newOperation.type,
        operation_type_id: newOperation.operation_type_id,
        notes: newOperation.notes
    });

};


operationServices.update= async(updateOperation,id)=>{

    const updated = await db.operation.update({
        type: updateOperation.type,
        operation_type_id: updateOperation.operation_type_id,
        notes: updateOperation.notes
    },{
        where: {
            id:Number.parseInt(id)
        }
    });

    if (updated===0) {
        throw new ValidationError(`failed to update the register with ID \"${id}\", is possible that it's not exists, or some field is incorrect.`)
    }
    
    return updated;

};


operationServices.delete= async(id)=>{

   // First we validating if the register exists
   const found = await db.operation.findByPk(id);

   if (!found) {
    throw new ValidationError(`an error is ocurred while the system tried delete a register ${id}, its not found`,
        `the register ${id} is not found`);
    }

    const response = await db.operation
        .destroy({where:{
            id:Number.parseInt(id)
        }});

    console.log("Response while try found the id: ", response);

    if (response===0) {
        throw new Error(`Failed to delete the register with id ${id}`);
    } 
};


operationServices.getAlls= async(page, count)=>{

    let results={};

    if (page && count) {

        results = await db.operation.findAndCountAll(
            {
                limit: count,
                offset: (page-1) * count
            }
        );

    } else {
        results = await db.operation.findAndCountAll();
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

operationServices.findById= async(id)=>{

    const found = await db.operation.findByPk(Number.parseInt(id));
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};


module.exports=operationServices;