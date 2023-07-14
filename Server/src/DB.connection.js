require('dotenv').config(); 
// process { env {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT}}

const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/firulai`, 
   { logging: false, native: false }
   ) 

const models = require("./models/index")
// EJERCICIO 05
for (const key in models) {
  models[key](sequelize)
}


// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Favorite } = sequelize.models;
// CharacterFavorite
User.belongsToMany(Favorite, { through: 'UserFavorite' });
Favorite.belongsToMany(User, { through: 'UserFavorite' });

module.exports = {
   ...sequelize.models, // User, Favorite
   conn: sequelize,
};