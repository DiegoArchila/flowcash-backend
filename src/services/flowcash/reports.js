const { ValidationError, where, fn, col, literal} = require("sequelize");
const db = require("../../database/models");


const reportsServices={};

reportsServices.getBalances= async()=>{
        
        const response = await db.flowcash.findAll({
            attributes: [
                [col('flowcash_type.id'), 'id'],
                [col('flowcash_type.name'), 'flowcash'],
                [col('operation_type.type'), 'type'],
                [col('operation_type.is_sum'), 'isSum'],
                [col('SUM', fn('COALESCE', col('flowcash.value'), 0)), 'total'],                
            ],
            include:[
                {
                    association: "flowcash_types",
                    attributes: [],
                    required: true
                },
                {
                    model: db.operation,
                    attributes: [],
                    required: true,
                    include: [
                        {
                            model: db.operation_type,
                            attributes: [],
                            required: true
                        }
                    ]
                }
            ],
            group: ['flowcash_type.id', 'flowcash_type.name', 'operation_type.type'],
            order: [[col('flowcash_type.name'),'ASC']]
        });
    
        return response;


};


module.exports=reportsServices;