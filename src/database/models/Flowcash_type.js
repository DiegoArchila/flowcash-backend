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
        timestamps: false,
    }

    // Assignation
    const flowcash_type= sequelize.define(alias, Columns, config);

    //HOOKS
    flowcash_type.beforeCreate((flowcashType) =>{
        if (flowcashType.name) {
            //Convert to lowercase to compare and prevent any error on duplicate before save
            flowcashType.dataValues.name = flowcashType.name.toLowerCase();
        }
    });

    flowcash_type.beforeUpdate((flowcashType) =>{
        if (flowcashType.name) {
            //Convert to lowercase to compare and prevent any error on duplicate before save
            flowcashType.dataValues.name = flowcashType.name.toLowerCase();
        }
    });

    //Relationship
    flowcash_type.associate= function(models) {
        
        flowcash_type.hasMany(models.flowcash,{
            as: "flowcashsMovements",
            foreignKey: "flowcash_type_id"
        });

        flowcash_type.hasMany(models.balance_period,{
            as: "balancesPeriods",
            foreignKey: "flowcash_type_id"
        });

    };

    return flowcash_type;
}