const { ValidationError, where, Op } = require("sequelize");
const db = require("../../../database/models");

const balancePeriodAdminServices = {};


/**
 * Retrieves the most recent datetime value from the `flowcash_type` table.
 * 
 * @async
 * @function getDatime_start
 * @returns {Promise<string>} The most recent datetime as a string.
 * @throws {Error} If no records are found.
 */
async function getDatime_start(transaction) {

    const datetime_start = await db.flowcash_type.findAll({
        attributes: ['datetime'],
        order: [['datetime', 'DESC']],
        limit: 1
    }, {transaction})

    return datetime_start[0].datetime;

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
            datetime: {[Op.gt]: await getDatime_start(transaction)}
        }
    }, {transaction});

    if (isEmptyMovements.length ===0) {
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
 * @returns {Promise<Object[]>} A list of balance results for each flowcash.
 * @throws {Error} If there are no movements to process or database operations fail.
 */
balancePeriodAdminServices.create = async (userId, notes, transaction) => {

    if (!userId) {
        throw new Error("error: not user found");        
    }

    //Eval if doestn't have any movement    
    await isEmptymovements(transaction);

    const datetime_end= new Date(Date.now()).toISOString();

    //obtain the flowcashs
    const flowcashs = await db.flowcash_type.findAll({
        attributes: ['id', 'name', 'datetime', 'balance']
    }, {transaction});

    //generate the UUID for the balance_document
    const UUID = crypto.randomUUID();

    const movementsPerFlowcash = [];

    for (const flowcash of flowcashs) {

        let movements = await db.flowcash.findAll({
            attributes: ['id', 'datetime', 'flowcash_type_id', 'value'],
            where: {
                flowcash_type_id: { [Op.eq]: flowcash.id },
                datetime: { [Op.gt]: flowcash.datetime },
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
            ]

            
        }, {transaction});

        let tempBalance=Number.parseFloat(flowcash.balance);
        let input=0;
        let output=0;

        for (const movement of movements) {

            
            if(movement.operation.operation_type.is_sum){
                tempBalance+=Number.parseFloat(movement.value);
                input+=Number.parseFloat(movement.value);
            } else {
                tempBalance-=Number.parseFloat(movement.value);
                output+=Number.parseFloat(movement.value);
            }
            
            movement.balance_period_id = UUID;
            
            await movement.save({transaction});
            
        }
        
        let result = {
            document_balance_id: UUID,
            Flowcash_id: flowcash.id,
            name: flowcash.name,
            datetime_start: flowcash.datetime,
            datetime_end: datetime_end,
            input: input,
            output: output,
            balance: Number.parseFloat(tempBalance),
        }


        await db.balance_period.create({
            balance_document: UUID,
            flowcash_type_id: flowcash.id,
            datetime_start: flowcash.datetime,
            datetime_end: datetime_end,
            input: Number.parseFloat(input),
            output: Number.parseFloat(output),
            balance: Number.parseFloat(tempBalance),
            user_id: userId,
            notes: notes
        }, {transaction});


        //Update the balance and the datetime in table flowcash_type
        flowcash.balance = Number.parseFloat(tempBalance);
        flowcash.datetime = datetime_end;

        await flowcash.save({transaction});

        movementsPerFlowcash.push(result);

    }


    return movementsPerFlowcash;

};

balancePeriodAdminServices.findAll = async (page, count) => {

    return await db.balance_period.findAll({
        attributes: ['balance_document', 'datetime_start', 'datetime_end'],
        limit: count,
        offset: (page-1) * count,
        order: [['datetime_start', 'DESC']],
        group: ['balance_document', 'datetime_start', 'datetime_end']
    });

};

balancePeriodAdminServices.findByBalanceDocument = async (balance_document, transaction) => {
    
    const balances = await db.balance_period.findAll({
        where: {
            balance_document: balance_document
        }
    }, {transaction});
    
    if (!balances) {
        throw new ValidationError(`the register with ID \"${id}\" it was not found`)
    }

    let balanceResult = [];

    for (const balance of balances) {

        //Parse the object sequealize
        const balanceObject = balance.toJSON();
       
        balanceObject.movements = await db.flowcash.findAll({
            attributes: { exclude: ['operation_id', 'flowcash_type_id', 'balance_period_id']},
            include: [
                {
                    model: db.operation, 
                    as: 'operation',
                    attributes: { exclude: ['notes', 'operation_type_id'] },
                    include: [
                        {
                            model: db.operation_type,
                            as: 'operation_type',
                            attributes: { exclude: ['notes'] },
                        }
                    ]
                }
            ],
            where: {
                balance_period_id: balance_document,
                flowcash_type_id: balance.flowcash_type_id
            },

        }, {transaction});

        balanceResult.push(balanceObject);
        
    }

    return balanceResult;

};



module.exports = balancePeriodAdminServices;