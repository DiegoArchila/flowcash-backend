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
            allowNull: false,
            references:{
                model: "operation_type",
                key: "id"
            }
        },
        notes:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    // Set configurations from model
    const config={
        tableName: "operation",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["type", "operation_type_id"]
            }
        ],
        hooks:{
            beforeCreate: (operation) =>{
                if(operation.type){
                    operation.dataValues.type=operation.type.toLowerCase();
                }
            },
            beforeUpdate: (operation) =>{
                if(operation.type){
                    operation.dataValues.type=operation.type.toLowerCase();
                }
            }
        }
    }

    // Assignation
    const operation= sequelize.define(alias, Columns, config);

    //Relationship
    operation.associate= function(models) {
        
        operation.belongsTo(models.operation_type,{
            as: "operation_type",
            foreignKey: 'operation_type_id'
        });

        operation.hasMany(models.flowcash,{
            as: "flowcashs",
            foreignKey:"operation_id"
        });

    };

    return operation;

}