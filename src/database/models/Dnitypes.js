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
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            length: 20,
            allowNull: false,
            unique: true
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
        timestamps: false,
        hooks:{
            beforeCreate: (dnitypes)=>{
                if (dnitypes.name) {
                    dnitypes.dataValues.name = dnitypes.name.toUpperCase();
                }
            },
            beforeUpdate: (dnitypes)=>{
                console.log("objecto recibido, ", dnitypes)
                if (dnitypes.name) {
                    dnitypes.dataValues.name = dnitypes.name.toUpperCase();
                }
            }
        }       
    }

    // Assignation
    const Dnitypes= sequelize.define(alias, Columns, config);

    // Hooks
    // Dnitypes.addHook('beforeCreate', (dnitypes) => {
    //     if (dnitypes.name) {
    //         dnitypes.dataValues.name = dnitypes.name.toUpperCase();
    //     }
    // });

    // Dnitypes.addHook('beforeUpdate', (dnitypes) => {
    //     console.log("objecto recibido, ", dnitypes)
    //     if (dnitypes.name) {
    //         dnitypes.name = dnitypes.name.toUpperCase();
    //     }
    // });

    //Relationship
    Dnitypes.associate= function(models) {
        
        Dnitypes.hasMany(models.users,{
            as: "users",
            foreignKey: "dnitype_id"
        });

    }

    return Dnitypes;

}