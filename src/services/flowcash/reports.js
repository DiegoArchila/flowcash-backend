const { ValidationError, where, fn, col, literal} = require("sequelize");
const db = require("../../database/models");


const reportsServices={};

reportsServices.getBalances= async()=>{
        
        const response = await db.sequelize.query(`
            SELECT
                flowcash_type.id AS flowcashTypeId,
                flowcash_type.name AS flowcashTypeName,
                operation_type.type AS operationTypeName,
                operation_type.is_sum AS is_sum,
                SUM(COALESCE(public.flowcash.value,0)) AS total 
            FROM flowcash
            INNER JOIN flowcash_type ON
                flowcash_type.id = flowcash.flowcash_type_id	
            INNER JOIN operation ON
                operation.id = flowcash.operation_id
            INNER JOIN operation_type ON
                operation_type.id = operation.operation_type_id
            WHERE flowcash.datetime > (
                SELECT MAX(balance_period.datetime_end) 
                FROM balance_period
            )
            GROUP BY flowcashTypeId, flowcashTypeName, operationTypeName, is_sum
            ORDER BY flowcashTypeId, is_sum DESC;
        `,{
            type: db.sequelize.QueryTypes.SELECT
        })

        return response;
};


module.exports=reportsServices;