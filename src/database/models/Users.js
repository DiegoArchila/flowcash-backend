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
            type: DataTypes.SMALLINT,
            allowNull: false,
            length: 20,
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
            type: DataTypes.SMALLINT,
            allowNull: false,
            length: 128,
            references: {
                model: "roles",
                key: "id"
            }
        },

        username:{
            type:DataTypes.STRING,
            length: 32,
            unique: true,
            allowNull: false
        },

        email:{
            type: DataTypes.STRING,
            length: 255,
            allowNull: false,
            unique: true,
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
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },

        notes: {
            type: DataTypes.STRING,
            length: 255,
            allowNull: true,
        }

    };

    // Set configurations from model or table
    const config={
        tableName: "users",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["dnitype_id", "dninumber"]
            }
        ],

    }

    // Assignation
    const Users= sequelize.define(alias, Columns, config);

    // Hooks

    //Relationship
    Users.associate= function(models) {
        
        Users.belongsTo(models.dnitypes,{
            as: "dnitype",
            foreignKey: "dnitype_id"
            
        });

        Users.belongsTo(models.roles,{
            as: "role",
            foreignKey: "role_id"
        });

    }

    return Users;

}