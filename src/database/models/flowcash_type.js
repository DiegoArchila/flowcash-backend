/**
 * flowcash_type Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */

module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "flowcash_type";

    //Sets Columns
    const Columns = {
        id:{
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        },
        balance:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },
        datetime:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        },
        notes:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    // Set configurations from model or table
    const config={
        tableName: "flowcash_type",
        timestamps: false
    }

    // Assignation
    const flowcash_type= sequelize.define(alias, Columns, config);

    //Relationship
    flowcash_type.associations= function(models) {
        
        flowcash_type.hasMany(models.Flowcash,{
            foreignKey: "flowcash_type_id",
            as: "flowcash_types"
        });

        flowcash_type.hasMany(models.Balance_daily,{
            foreignKey: "flowcash_type_id",
            as: "flowcash_balances_dailies"
        })
    };

    return flowcash_type;
}
