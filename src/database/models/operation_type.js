/**
 * Operation_type Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */
module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "operation_type";

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
            allowNull: false,
            unique: true
        },
        is_sum:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        notes:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    // Set configurations from model or table
    const config={
        tableName: "operation_type",
        timestamps: false
    }

    // Assignation
    const operation_type= sequelize.define(alias, Columns, config);

    //Relationship
    operation_type.associations= function(models) {
        operation_type.hasMany(models.operation,{
            foreignKey: "operation_type_id",
            as: "operations"
        })
    }

    return operation_type;

}