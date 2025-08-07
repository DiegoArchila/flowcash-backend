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
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            length: 128,
            allowNull: false,
            unique: true
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
        timestamps: true
    }

    // Assignation
    const Roles= sequelize.define(alias, Columns, config);

    // Hooks
    Roles.addHook('beforeCreate', (roles) => {
        if (roles.name) {
            roles.dataValues.name=roles.name.toLocaleLowerCase();
        }
    });

    Roles.addHook('beforeUpdate', (roles) => {
        if (roles.name) {
            roles.dataValues.name=roles.name.toLocaleLowerCase();
        }
    });

    //Relationship
    Roles.associate= function(models) {
        
        Roles.hasMany(models.users,{
            as: "users",
            foreignKey: "role_id"
        });

    }

    return Roles;

}