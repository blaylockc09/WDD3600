const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// set up the Order model for sequelize 
const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Order;
