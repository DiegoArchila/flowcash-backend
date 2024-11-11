/**
 * flowcash Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */
module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "roles";

    //Sets Columns
    const Columns = {

        id:{
            type: DataTypes.STRING,
            length: 128,
            primaryKey: true,
        },

        description:{
            type: DataTypes.STRING,
            length: 255,
            allowNull: false
        }

    };

    // Set configurations from model or table
    const config={
        tableName: "roles",
        timestamps: false
    }

    // Assignation
    const Roles= sequelize.define(alias, Columns, config);

    //Relationship
    Roles.associate= function(models) {
        
        Roles.hasMany(models.users,{
            as: "rel-role-users",
            foreignKey: "role_id"
        });

    }

    return Roles;

}