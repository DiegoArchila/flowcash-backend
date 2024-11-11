/**
 * flowcash Object Model Representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 */
module.exports=(sequelize, DataTypes) =>{

    //Set the Alias
    const alias = "users";

    //Sets Columns
    const Columns = {

        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        names:{
            type: DataTypes.STRING,
            length: 128,
            allowNull: false
        },

        dnitype_id:{
            type: DataTypes.STRING,
            length: 20,
            allowNull: false,
            references: {
                model: "dnitypes",
                key: "id"
            }
        },

        dninumber:{
            type: DataTypes.STRING,
            length: 32,
            allowNull: false
        },

        role_id:{
            type: DataTypes.TEXT,
            allowNull: false,
            references: {
                model: "roles",
                key: "id"
            }
        },

        username:{
            type:DataTypes.STRING,
            length: 32,
            allowNull: false
        },

        email:{
            type: DataTypes.STRING,
            length: 255,
            allowNull: false,
            validate:{
                isEmail: {
                    msg: 'Please, input an email valid'
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            length: 255,
            allowNull: false,
        }

    };

    // Set configurations from model or table
    const config={
        tableName: "users",
        timestamps: false
    }

    // Assignation
    const Users= sequelize.define(alias, Columns, config);

    //Relationship
    Users.associate= function(models) {
        
        Users.belongsTo(models.dnitypes,{
            as: "rel-user-dnitypes",
            foreignKey: "dnitype_id"
            
        });

        Users.belongsTo(models.roles,{
            as: "rel-user-roles",
            foreignKey: "role_id"
        });

    }

    return Users;

}