/**
 * balance_period Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */

module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "balance_period";

    //Sets Columns
    const Columns = {

        //UUID for the balance document
        //This is the primary key for the balance_period table
        //It is used to identify the balance period document
        balance_document: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,            
        },

        flowcash_type_id:{
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: "flowcash_type",
                key: "id"
            }
        },
        
        datetime_start:{
            type: DataTypes.DATE,
            allowNull: false
        },
        
        datetime_end:{
            type: DataTypes.DATE,
            allowNull: false
        },

        input:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },

        output:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },

        balance:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },

        user_id:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },

        notes:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    // Set configurations from model or table
    const config={
        tableName: "balance_period",
        timestamps: false
    }

    // Assignation
    const balance_period= sequelize.define(alias, Columns, config);

    //Relationship
    balance_period.associate= function(models) {
        
        balance_period.belongsTo(models.flowcash_type,{
            as: "flowcash_types",
            foreignKey: 'flowcash_type_id'
        });

        balance_period.belongsTo(models.users,{
            as: "user",
            foreignKey: 'user_id'
        });

        balance_period.hasMany(models.flowcash,{
            as: "flowcashs",
            foreignKey: "balance_period_id"
        });

    }

    return balance_period;
}