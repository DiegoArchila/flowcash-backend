const { ValidationError, where, Op } = require("sequelize");
const db = require("../../database/models");

const flowcashServices={};

/**
 * Creates a new flowcash record.
 * @param {Object} newFlowcash - The data for the new flowcash record.
 * @param {number} newFlowcash.operation_id - The ID of the related operation.
 * @param {number} newFlowcash.flowcash_type_id - The ID of the flowcash type.
 * @param {number} newFlowcash.value - The value of the flowcash.
 * @param {string} newFlowcash.description - Description of the flowcash.
 * @returns {Promise<Object>} The created flowcash record.
 */
flowcashServices.create= async(newFlowcash)=>{

    const response = await db.flowcash.create({
        operation_id: newFlowcash.operation_id,
        flowcash_type_id: newFlowcash.flowcash_type_id,
        value: newFlowcash.value,
        description: newFlowcash.description
    });

};

/**
 * Updates an existing flowcash record.
 * @param {Object} updateFlowcash - The updated data for the flowcash record.
 * @param {number} id - The ID of the flowcash record to update.
 * @throws {ValidationError} If no records are updated.
 * @returns {Promise<number>} The number of affected rows.
 */
flowcashServices.update= async(updateFlowcash,id)=>{

    const updated = await db.flowcash.update({
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

/**
 * Deletes a flowcash record.
 * @param {number} id - The ID of the flowcash record to delete.
 * @throws {ValidationError} If the record does not exist.
 * @throws {Error} If the deletion fails.
 * @returns {Promise<number>} The number of affected rows.
 */
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
/**
 * Retrieves paginated flowcash records.
 * @param {number} [page] - The page number for pagination.
 * @param {number} [count] - The number of records per page.
 * @returns {Promise<Object>} Paginated flowcash records.
 */
flowcashServices.getAlls = async (page, count) => {

    let results = {};
    let initialDate = null; // Variable para almacenar la fecha de partida final

    // 1. Intentar encontrar la última fecha de balance_period
    const balancePeriodFlowcash = await db.balance_period.findAll({
        attributes: ["datetime_end"],
        limit: 1,
        order: [
            ['datetime_end', 'DESC']
        ]
    });

    if (balancePeriodFlowcash.length > 0) {
        initialDate = balancePeriodFlowcash[0].datetime_end;
    } else {
        // 2. Si no hay registros en balance_period, intentar en flowcash_type
        const balancePeriodFlowcashType = await db.flowcash_type.findAll({
            attributes: ["datetime"],
            limit: 1,
            order: [
                ['datetime', 'DESC']
            ]
        });

        if (balancePeriodFlowcashType.length > 0) {
            initialDate = balancePeriodFlowcashType[0].datetime;
        }
        // Si initialDate sigue siendo null aquí, significa que ambas tablas están vacías.
        // En este caso, no aplicaremos la cláusula 'where' de fecha, lo que recuperará todos los registros.
    }

    // Construir la cláusula 'where' dinámicamente
    let whereClause = {};
    if (initialDate) {
        // Solo aplica la condición de fecha si se encontró una fecha de partida válida
        whereClause.datetime = { [Op.gt]: initialDate };
    }

    if (page && count) {
        results = await db.flowcash.findAndCountAll(
            {
                where: whereClause, // Usa la cláusula 'where' construida dinámicamente
                limit: parseInt(count), // Asegurarse que count sea un número entero
                offset: (parseInt(page) - 1) * parseInt(count), // Asegurarse que page y count sean enteros
                order: [
                    ['datetime', 'DESC']
                ]
            }
        );

        return {
            currentPage: parseInt(page),
            totalPages: Math.ceil(results.count / count),
            totalRow: results.count,
            data: results.rows
        }

    } else {
        // Si no se proporcionan 'page' y 'count', se devuelve todo sin paginación.
        // La cláusula whereClause sigue siendo aplicable aquí si quieres filtrar también.
        // Si quieres que este else SIEMPRE devuelva TODO sin filtro de fecha,
        // simplemente omite el 'where: whereClause'.
        results = await db.flowcash.findAndCountAll({
                where: whereClause, // Omitir esta línea si quieres que este else SIEMPRE ignore la fecha de partida
                order: [
                    ['datetime', 'DESC']
                ]
        });
            return {
                count: results.count, // CORREGIDO: Usar results.count, no results.row
                data: results.rows    // CORREGIDO: Devolver results.rows para los datos
            }
    }
};

/**
 * Finds a flowcash record by its ID.
 * @param {number} id - The ID of the flowcash record.
 * @throws {ValidationError} If the record is not found.
 * @returns {Promise<Object>} The found flowcash record.
 */
flowcashServices.findById= async(id)=>{

    const found = await db.flowcash.findByPk(Number.parseInt(id));
    
    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};

module.exports=flowcashServices;