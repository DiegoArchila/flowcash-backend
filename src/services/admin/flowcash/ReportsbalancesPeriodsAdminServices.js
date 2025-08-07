const { ValidationError, where, Op, fn, col } = require("sequelize");
const db = require("../../../database/models");

const ReportbalancesPeriodsAdminServices = {};


/**
 * Retrieves the most recent datetime value from the `flowcash_type` table.
 * 
 * @async
 * @function getDatime_start
 * @returns {Promise<string>} The most recent datetime as a string.
 * @throws {Error} If no records are found.
 */
async function getDatime_start(transaction) {
    // We first look for the most recent datetime_end in reports_balances_periods
    const latestReport = await db.reports_balances_periods.findOne({
        attributes: ['datetime_end'],
        order: [['datetime_end', 'DESC']],
        transaction
    });

    // If not there is any report, we look for the oldest datetime in flowcash
    if (!latestReport) {
        const oldestFlowcash = await db.flowcash.findOne({
            attributes: ['datetime'],
            order: [['datetime', 'ASC']],
            transaction
        });

        return oldestFlowcash ? oldestFlowcash.datetime : null;
    }

    return latestReport.datetime_end;
}



/**
 * Checks if there are any movements in the `flowcash` table after the most recent datetime in `flowcash_type`.
 * 
 * @async
 * @function isEmptymovements
 * @throws {Error} If no movements exist after the specified datetime.
 */
async function isEmptymovements(transaction) {

    const isEmptyMovements = await db.flowcash.findAll({
        attributes: ['datetime'],
        where: {
            datetime: { [Op.gt]: await getDatime_start(transaction) }
        },
        transaction
    });

    if (isEmptyMovements.length === 0) {
        throw new Error("error: doesn't have any movement, please add for allow continue.")
    }

}


/**
 * Creates a new balance period and updates the balances and datetimes for each flowcash.
 * 
 * @async
 * @function create
 * @memberof balancePeriodAdminServices
 * @param {number} userId - The ID of the user creating the balance period.
 * @param {string} notes - Notes associated with the balance period.
 * @param {import("sequelize").Transaction} transaction - Sequelize transaction instance.
 * @returns {Promise<Object[]>} A list of balance results for each flowcash.
 * @throws {Error} If there are no movements to process or database operations fail.
 */
ReportbalancesPeriodsAdminServices.create = async (userId, notes, transaction) => {

    if (!userId) {
        throw new Error("Error: No user found");
    }

    await isEmptymovements(transaction);

    const datetime_end = new Date().toISOString();
    const datetime_start = await getDatime_start(transaction);
    const UUID_report_balance_period = crypto.randomUUID();
    let total_input = 0;
    let total_output = 0;
    let total_balance = 0;

    const balance_period_per_flowcash = [];
    const movements_per_flowcash = [];

    // Get all flowcash types
    const flowcashs = await db.flowcash_type.findAll({
        attributes: ['id', 'name', 'datetime', 'balance'],
        transaction
    });

    // Iterate over each flowcash type to calculate balances and movements
    for (const flowcash of flowcashs) {
        const UUID_balance_period = crypto.randomUUID();

        // Get all movements for the current flowcash type after the last balance period
        const movements = await db.flowcash.findAll({
            attributes: ['id', 'datetime', 'flowcash_type_id', 'value'],
            where: {
                flowcash_type_id: flowcash.id,
                datetime: { [Op.gt]: datetime_start },
                balance_period_id: null,
            },
            include: [
                {
                    model: db.operation,
                    as: 'operation',
                    attributes: ['id', 'type'],
                    include: [
                        {
                            model: db.operation_type,
                            as: 'operation_type',
                            attributes: ['id', 'is_sum'],
                        }
                    ]
                }
            ],
            transaction
        });



        /** 
         * Calculate input, output and balance for the current flowcash 
         * */

        //Initialize temporary balance and input/output totals
        let tempBalance = parseFloat(flowcash.balance);
        let input = 0;
        let output = 0;

        // Calculate input and output totals based on movements
        for (const movement of movements) {
            const value = parseFloat(movement.value);
            if (movement.operation.operation_type.is_sum) {
                input += value;
                tempBalance += value;
            } else {
                output += value;
                tempBalance -= value;
            }
        }



        // Round values to two decimal places
        tempBalance = parseFloat(tempBalance.toFixed(2));
        input = parseFloat(input.toFixed(2));
        output = parseFloat(output.toFixed(2));

        total_input += input;
        total_output += output;
        total_balance += tempBalance;

        /** ----------------------------------------------- */


        /** 
         * Store balance period and movements for the current flowcash type
         */

        balance_period_per_flowcash.push({
            id: UUID_balance_period,
            flowcash_type_id: flowcash.id,
            input,
            output,
            balance: tempBalance
        });

        movements_per_flowcash.push({
            balance_period_id: UUID_balance_period,
            flowcash_type_id: flowcash.id,
            flowcash_id: flowcash.id,
            movements
        });
        /** ----------------------------------------------- */

    }

    /**
     *  Create report balance period and update balances and datetimes for each flowcash type
     */
    const reportCreated = await db.reports_balances_periods.create({
        id: UUID_report_balance_period,
        datetime_start,
        datetime_end,
        total_input,
        total_output,
        total_balance,
        user_id: userId,
    }, { transaction });

    // Create balance periods for each flowcash type
    for (const balance of balance_period_per_flowcash) {
        await db.balance_period.create({
            id: balance.id,
            flowcash_type_id: balance.flowcash_type_id,
            input: balance.input,
            output: balance.output,
            balance: balance.balance,
            report_balance_period_id: UUID_report_balance_period,
            notes,
            user_id: userId,
        }, { transaction });
    }

    // Update movements with the new balance period ID and update flowcash type balances and datetimes
    for (const group of movements_per_flowcash) {
        for (const movement of group.movements) {
            movement.balance_period_id = group.balance_period_id;
            await movement.save({ transaction });
        }

        const newBalance = balance_period_per_flowcash.find(b => b.flowcash_type_id === group.flowcash_type_id).balance;

        await db.flowcash_type.update(
            {
                balance: newBalance,
                datetime: datetime_end
            },
            {
                where: { id: group.flowcash_type_id },
                transaction
            }
        );
    }

    console.log("Report created:", reportCreated);

    return reportCreated;
};



/**
 * finds all reports balance periods with pagination.
 * @param {*} page 
 * @param {*} count 
 * @returns 
 */
ReportbalancesPeriodsAdminServices.findAll = async (page, count) => {

    const results = await db.reports_balances_periods.findAndCountAll({

        attributes: [
            "id",
            "datetime_start",
            "datetime_end",
            "total_input",
            "total_output",
            "total_balance",
        ],
        limit: count,
        offset: (page - 1) * count,
        order: [['datetime_end', 'DESC']],
        include: [
            {
                model: db.users,
                as: 'report-user',
                attributes: ['id', 'names']
            },
            {
                model: db.balance_period,
                as: 'balance_periods',
                attributes: ['id', 'flowcash_type_id', 'input', 'output', 'balance'],
                include: [
                    {
                        model: db.flowcash_type,
                        as: 'flowcash_types',
                        attributes: ['id', 'name']
                    },
                    {
                        model: db.flowcash,
                        as: 'flowcashs',
                        attributes: ['id', 'datetime', 'value', 'description'],
                        include: [
                            {
                                model: db.users,
                                as: 'user',
                                attributes: ['id', 'names']
                            },
                            {
                                model: db.operation,
                                as: 'operation',
                                attributes: ['id', 'type'],
                                include: [
                                    {
                                        model: db.operation_type,
                                        as: 'operation_type',
                                        attributes: ['id', 'type', 'is_sum']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]

    });

    console.log(results);

    const totalRow = Array.isArray(results.count).length
        ? results.count.length
        : results.count;

    return {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRow / count),
        count: results.rows.length,
        data: results.rows
    };
};


ReportbalancesPeriodsAdminServices.findByBalanceDocument = async (balance_document, transaction) => {

    const balances = await db.balance_period.findAll({
        where: {
            balance_document: balance_document
        }
    }, { transaction });

    if (!balances) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    let balanceResult = [];

    for (const balance of balances) {

        //Parse the object sequealize
        const balanceObject = balance.toJSON();

        balanceObject.movements = await db.flowcash.findAll({
            attributes: { exclude: ['operation_id', 'flowcash_type_id', 'balance_period_id'] },
            include: [
                {
                    model: db.operation,
                    as: 'operation',
                    attributes: { exclude: ['notes', 'operation_type_id'] },
                    include: [
                        {
                            model: db.operation_type,
                            as: 'operation-type',
                            attributes: { exclude: ['notes'] },
                        }
                    ]
                }
            ],
            where: {
                balance_period_id: balance_document,
                flowcash_type_id: balance.flowcash_type_id
            },

        }, { transaction });

        balanceResult.push(balanceObject);

    }

    return balanceResult;

};



module.exports = ReportbalancesPeriodsAdminServices;