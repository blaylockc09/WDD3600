/* allows us to connect to the database */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete','root', 'Password!', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;