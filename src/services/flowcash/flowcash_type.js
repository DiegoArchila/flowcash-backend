const { ValidationError, where } = require("sequelize");
const db = require("../../database/models");

const flowcash_typeServices={};

flowcash_typeServices.create= async(newFlowcash_type)=>{

    const response = await db.flowcash_type.create({
        name: newFlowcash_type.name,
        balance: newFlowcash_type.balance,
        notes: newFlowcash_type.notes
    });

};

flowcash_typeServices.update= async(updateFlowcash_type,id)=>{

    const updated = await db.flowcash_type.update({
        name: updateFlowcash_type.name,
        balance: updateFlowcash_type.balance,
        datetime: new Date(),
        notes: updateFlowcash_type.notes
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

flowcash_typeServices.delete= async(id)=>{

   // First we validating if the register exists
   const found = await db.flowcash_type.findByPk(id);

   if (!found) {
    throw new ValidationError(`an error is ocurred while the system tried delete a register ${id}, its not found`,
        `the register ${id} is not found`);
    }

    const response = await db.flowcash_type
        .destroy({where:{
            id:id
        }});

    console.log("Response while try found the id: ", response);

    if (response===0) {
        throw new Error(`Failed to delete the register with id ${id}`);
    } 
};

flowcash_typeServices.getAlls= async(page, count)=>{

    let results={};

    if (page && count) {

        results = await db.flowcash_type.findAndCountAll(
            {
                limit: count,
                offset: (page-1) * count
            }
        );

    } else {
        results = await db.flowcash_type.findAndCountAll();
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

flowcash_typeServices.findById= async(id)=>{

    const found = await db.flowcash_type.findByPk(id);
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};


module.exports=flowcash_typeServices;