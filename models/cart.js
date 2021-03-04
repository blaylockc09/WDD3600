const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// set up the Cart model for sequelize 
const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
