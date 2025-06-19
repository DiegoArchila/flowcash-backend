const { ValidationError, where, Op } = require("sequelize");
const db = require("../../database/models");

const flowcashServices = {};

/**
 * Creates a new flowcash record.
 * @param {Object} newFlowcash - The data for the new flowcash record.
 * @param {number} newFlowcash.operation_id - The ID of the related operation.
 * @param {number} newFlowcash.flowcash_type_id - The ID of the flowcash type.
 * @param {number} newFlowcash.value - The value of the flowcash.
 * @param {string} newFlowcash.description - Description of the flowcash.
 * @returns {Promise<Object>} The created flowcash record.
 */
flowcashServices.create = async (newFlowcash) => {

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
flowcashServices.update = async (updateFlowcash, id) => {

    const updated = await db.flowcash.update({
        operation_id: updateFlowcash.operation_id,
        flowcash_type_id: updateFlowcash.flowcash_type_id,
        value: updateFlowcash.value,
        description: updateFlowcash.description
    }, {
        where: {
            id: id
        }
    });

    if (updated === 0) {
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
flowcashServices.delete = async (id) => {

    // First we validating if the register exists
    const found = await db.flowcash.findByPk(id);

    if (!found) {
        throw new ValidationError(`an error is ocurred while the system tried delete a register ${id}, its not found`,
            `the register ${id} is not found`);
    }

    const response = await db.flowcash
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

/**
 * Retrieves paginated flowcash records.
 * If no balance_period exists, it falls back to flowcash_type or epoch start.
 * @param {number} [page] - The page number for pagination.
 * @param {number} [count] - The number of records per page.
 * @returns {Promise<Object>} Paginated flowcash records.
 */
flowcashServices.getAlls = async (page, count) => {
    
    let results = {};
    let referenceDate;

    // 1. We check if there is a balance_period, and get the last datetime_end
    const balancePeriodFlowcash = await db.balance_period.findAll({
        attributes: ['datetime_end'],
        limit: 1,
        order: [['datetime_end', 'DESC']]
    });

    referenceDate = balancePeriodFlowcash.length > 0
        ? balancePeriodFlowcash[0].datetime
        : new Date(0); // Fallback: 1970-01-01

    results = await db.flowcash.findAndCountAll({
        where: {
            datetime: {
                [Op.gt]: referenceDate
            }
        },
        order: [['datetime', 'DESC']]
    });


    // 2. If page and count are provided, paginate the results
    if (page && count) {
        results = await db.flowcash.findAndCountAll({
            where: {
                datetime: {
                    [Op.gt]: referenceDate
                }
            },
            limit: count,
            offset: (page - 1) * count,
            order: [['datetime', 'DESC']]
        });

        return {
            currentPage: parseInt(page),
            totalPages: Math.ceil(results.count / count),
            totalRow: results.count,
            data: results.rows
        };
    }

    // 3. If no pagination parameters are provided, return all records after the reference date
    results = await db.flowcash.findAndCountAll({
        where: {
            datetime: {
                [Op.gt]: referenceDate
            }
        },
        order: [['datetime', 'DESC']]
    });

    return {
        count: results.count,
        data: results.rows
    };
};



/**
 * Finds a flowcash record by its ID.
 * @param {number} id - The ID of the flowcash record.
 * @throws {ValidationError} If the record is not found.
 * @returns {Promise<Object>} The found flowcash record.
 */
flowcashServices.findById = async (id) => {

    const found = await db.flowcash.findByPk(Number.parseInt(id));

    if (!found) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    return found;

};

module.exports = flowcashServices;