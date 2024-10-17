/**
 * flowcash Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */
module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "flowcash";

    //Sets Columns
    const Columns = {
        id:{
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        datetime:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        },
        operation_id:{
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: "operation",
                key: "id"
            }
        },
        flowcash_type_id:{
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: "flowcash_type",
                key: "id"
            }
        },
        value:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    };

    // Set configurations from model or table
    const config={
        tableName: "flowcash",
        timestamps: false
    }

    // Assignation
    const flowcash= sequelize.define(alias, Columns, config);

    //Relationship
    flowcash.associate= function(models) {
        
        flowcash.belongsTo(models.flowcash_type,{
            as: "flowcash_type",
            
        });

        flowcash.belongsTo(models.operation,{
            as: "operation_flowcash"
        });

    }

    return flowcash;

}