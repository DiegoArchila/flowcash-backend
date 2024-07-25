/**
 * operation Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize; 
 * @param {import("sequelize").DataTypes} DataTypes; 
 */

module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "operation";

    //Sets Columns
    const Columns = {
        id:{
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type:{
            type: DataTypes.STRING(64),
            allowNull: false
        },
        operation_type_id:{
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        notes:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    // Set configurations from model or table
    const config={
        tableName: "operation",
        timestamps: false
    }

    // Assignation
    const operation= sequelize.define(alias, Columns, config);

    //Relationship
    operation.associations= function(models) {
        
        operation.belongsTo(models.Operation_type,{
            as: "type_operation"
        });

        operation.hasMany(models.Flowcash,{
            foreignKey:"operation_id",
            as: "operations_flowcash"
        });
    }
}