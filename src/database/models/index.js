'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


/** Auto Update */
// sequelize.sync({
//   force: true, // Cambia a true si quieres reiniciar por completo la base de datos
//   alter: false // Cambia a force: true si quieres reiniciar por completo
// }).then(async () => {

//   await db.operation_type.bulkCreate([
//     { type: "ingreso", is_sum: true, notes: null },
//     { type: "egreso", is_sum: false, notes: null }
//   ]);

//   await db.operation.bulkCreate([
//     {
//       type: "gastos operativos",
//       operation_type_id: 2,
//       notes: 'como lo son la luz, el agua, el arriendo, planes de celulares, internet...'
//     },
//     {
//       type: "gastos fletes",
//       operation_type_id: 2,
//       notes: 'estos gastos estan relacionados con los pagos de transportes...'
//     },
//     {
//       type: "gastos alimentos",
//       operation_type_id: 2,
//       notes: 'Estos gastos estan relacionados con el pago de alimentos...'
//     },
//     {
//       type: "pagos a proveedores",
//       operation_type_id: 2,
//       notes: 'estos pagos son cuando se pagan las facturas o servicios a los proveedores'
//     },
//     {
//       type: "pagos de clientes",
//       operation_type_id: 1,
//       notes: 'estos pagos son cuando el cliente paga facturas o servicios'
//     }
//   ]);

//   await db.flowcash_type.bulkCreate([
//     {
//       name: 'efectivo',
//       balance: 0,
//       notes: 'en esta caja se almacenará todo el flujo del efectivo'
//     },
//     {
//       name: 'bancolombia ahorro',
//       balance: 0,
//       notes: 'en esta caja se almacenará todo el flujo de la cuenta bancaria de ahorros'
//     },
//   ]);

//   await db.dnitypes.bulkCreate([
//     { name: 'DNI', description: 'Documento Nacional de Identidad' },
//     { name: 'NIT', description: 'Número de Identificación Tributaria' },
//     { name: 'CC', description: 'Cédula de Ciudadanía' },
//     { name: 'CE', description: 'Cédula de Extranjería' },
//     { name: 'TI', description: 'Tarjeta de Identidad' }
//   ]);

//   await db.roles.bulkCreate([
//     {
//       name: 'admin',
//       description: 'Role admin for the application, has all permissions and access.'
//     },
//     {
//       name: 'common',
//       description: 'Role common user, has limited permissions and access.'
//     }
//   ]);

//   await db.users.bulkCreate([
//     {
//       names: 'Administrador',
//       dnitype_id: 1,
//       dninumber: '123456789',
//       role_id: 1,
//       username: 'admin',
//       email: 'admin@mabla.com',
//       password: "$argon2id$v=19$m=65536,t=3,p=4$uqFV6gK+JF35/A96M0BUkA$7qAi1p9HzGQNbR7ZVSeWW8eaFcncQQllCMjoyQwt1Yw", // sofia
//       is_active: true,
//       notes: 'This is the default admin user created during the initial setup of the application.'
//     }
//   ]);

// }).catch(err => {
//   console.error('Error during database synchronization:', err);
// });


/** Add the data required for this project */

module.exports = db;
