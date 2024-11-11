/**
 * flowcash Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */
module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "dnitypes";

    //Sets Columns
    const Columns = {

        id:{
            type: DataTypes.STRING,
            length: 20,
            primaryKey: true,
        },

        description:{
            type: DataTypes.STRING,
            length: 128,
            allowNull: false
        }

    };

    // Set configurations from model or table
    const config={
        tableName: "dnitypes",
        timestamps: false
    }

    // Assignation
    const Dnitypes= sequelize.define(alias, Columns, config);

    //Relationship
    Dnitypes.associate= function(models) {
        
        Dnitypes.hasMany(models.users,{
            as: "rel-dnitype-users",
            foreignKey: "dnitype_id"
        });

    }

    return Dnitypes;

}