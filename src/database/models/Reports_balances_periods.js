/**
 * flowcash Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */
module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "reports_balances_periods";

    //Sets Columns
    const Columns = {

        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },

        datetime_start:{
            type: DataTypes.DATE,
            allowNull: false
        },
        
        datetime_end:{
            type: DataTypes.DATE,
            allowNull: false
        },

        total_input:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },

        total_output:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },

        total_balance:{
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
        tableName: "reports_balances_periods",
        timestamps: false,

    }

    // Assignation
    const Reports_balances_periods= sequelize.define(alias, Columns, config);

    // Hooks

    //Relationship
    Reports_balances_periods.associate= function(models) {

        Reports_balances_periods.belongsTo(models.users,{
            as: "report-user",
            foreignKey: "user_id"
        }); 

        Reports_balances_periods.hasMany(models.balance_period,{
            as: "balance_periods",
            foreignKey: "report_balance_period_id"
        });

    }

    return Reports_balances_periods;

}