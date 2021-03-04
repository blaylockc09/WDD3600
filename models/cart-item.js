const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// set up the CartItem model for sequelize 
const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
