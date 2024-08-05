const { ValidationError, where } = require("sequelize");
const db = require("../../database/models");

const flowcashServices={};

flowcashServices.create= async(newFlowcash)=>{

    const response = await db.flowcash.create({
        operation_id: newFlowcash.operation_id,
        flowcash_type_id: newFlowcash.flowcash_type_id,
        value: newFlowcash.value,
        description: newFlowcash.description
    });

};

flowcashServices.update= async(updateFlowcash,id)=>{

    const updated = await db.flowcash.update({
        datetime: new Date(),
        operation_id: updateFlowcash.operation_id,
        flowcash_type_id: updateFlowcash.flowcash_type_id,
        value: updateFlowcash.value,
        description: updateFlowcash.description
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

flowcashServices.delete= async(id)=>{

   // First we validating if the register exists
   const found = await db.flowcash.findByPk(id);

   if (!found) {
    throw new ValidationError(`an error is ocurred while the system tried delete a register ${id}, its not found`,
        `the register ${id} is not found`);
    }

    const response = await db.flowcash
        .destroy({where:{
            id:id
        }});

    console.log("Response while try found the id: ", response);

    if (response===0) {
        throw new Error(`Failed to delete the register with id ${id}`);
    } 
};

flowcashServices.getAlls= async(page, count)=>{

    let results={};

    if (page && count) {

        results = await db.flowcash.findAndCountAll(
            {
                limit: count,
                offset: (page-1) * count
            }
        );

    } else {
        results = await db.flowcash.findAndCountAll();
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

flowcashServices.findById= async(id)=>{

    const found = await db.flowcash.findByPk(Number.parseInt(id));
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};

module.exports=flowcashServices;