'use strict'

const Sequelize = require('sequelize');

//If you're using SQLite, you should use the following instead:
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});


/* Testing the connection
You can use the .authenticate() function to test if the connection is OK: */
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


/* Modeling a table
A model is a class that extends Sequelize.Model. Models can be defined in two equivalent ways. The first, with Sequelize.Model.init(attributes, options): */
const Model = Sequelize.Model;
class User extends Model {}
User.init({
  // attributes / columnas
  Nombre: { //nombre de la columna
    type: Sequelize.STRING, //tipo string
    allowNull: false  //no permite nulos
  },
  Apellidos: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  Edad: {
      type: Sequelize.NUMBER
  }
}, {
  sequelize,
  modelName: 'user' //nombre de la tabla
});


/* Synchronizing the model with the database
If you want Sequelize to automatically create the table (or modify it as needed) according to your model definition, you can use the sync method, as follows: */

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return User.create({
    Nombre: 'John',
    Apellidos: 'Hancock',
    Edad: 25
  });
});