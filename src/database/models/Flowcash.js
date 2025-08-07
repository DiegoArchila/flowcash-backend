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
            type: DataTypes.INTEGER,
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
        },

        balance_period_id: {
            type: DataTypes.UUID,
            allowNull: true
        },

        user_id:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
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
            foreignKey: "flowcash_type_id"
            
        });

        flowcash.belongsTo(models.operation,{
            as: "operation",
            foreignKey: "operation_id"
        });

        flowcash.belongsTo(models.balance_period,{
            as: "balance_period",
            foreignKey: "balance_period_id"
        });

        flowcash.belongsTo(models.users,{
            as: "user",
            foreignKey: "user_id"
        });

    }

    return flowcash;

}