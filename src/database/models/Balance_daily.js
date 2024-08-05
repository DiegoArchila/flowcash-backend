/**
 * balance_daily Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */

module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "balance_daily";

    //Sets Columns
    const Columns = {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        flowcash_type_id:{
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: "flowcash_type",
                key: "id"
            }
        },
        datetime:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false
        },
        balance:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },
        notes:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    // Set configurations from model or table
    const config={
        tableName: "balance_daily",
        timestamps: false
    }

    // Assignation
    const Balance_daily= sequelize.define(alias, Columns, config);

    //Relationship
    Balance_daily.associations= function(models) {
        
        Balance_daily.belongsTo(models.Flowcash_type,{
            as: "flowcash_balance_daily"
        });

    }

    return Balance_daily;
}