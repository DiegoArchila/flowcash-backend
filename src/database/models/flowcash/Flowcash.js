/**
 * flowcash Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */

module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "Flowcash";

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
            allowNull: false
        },
        flowcash_type_id:{
            type: DataTypes.SMALLINT,
            allowNull: false
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
        tableName: "flowcash"
    }

    // Assignation
    const flowcash= sequelize.define(alias, Columns, config);

    //Relationship
    flowcash.associations= function(models) {
        
        flowcash.belongsTo(models.Flowcash_type,{
            as: "type_flowcash"
        });

        flowcash.belongsTo(models.Operation,{
            as: "operation_flowcash"
        });

    }

}