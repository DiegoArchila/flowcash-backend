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
            allowNull: false,
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

    // Set configurations from model or table
    const config={
        tableName: "operation",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["type", "operation_type_id"]
            }
        ]
    }

    // Assignation
    const operation= sequelize.define(alias, Columns, config);

    //HOOKS
    operation.beforeCreate((operation) =>{
        if (operation.type) {
            //Convert to lowercase to compare and prevent any error on duplicate before save
            operation.type = operation.type.toLowerCase();
        }
    });

    //Relationship
    operation.associations= function(models) {
        
        operation.belongsTo(models.operation_type,{
            as: "type_operation"
        });

        operation.hasMany(models.Flowcash,{
            foreignKey:"operation_id",
            as: "operations_flowcash"
        });
    };

    return operation;

    
}