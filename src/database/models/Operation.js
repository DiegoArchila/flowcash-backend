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
            unique: true
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
    operation.associate= function(models) {
        
        operation.belongsTo(models.operation_type,{
            as: "rel-operation-operation_types",
            foreignKey: 'operation_type_id'
        });

        operation.hasMany(models.flowcash,{
            as: "rel-operation-flowcashs",
            foreignKey:"operation_id"
        });

    };

    return operation;

}