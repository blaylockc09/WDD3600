const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// set up the OrderItem model for sequelize 
const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = OrderItem;
