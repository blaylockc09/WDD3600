const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// set up the Product model for sequelize 
const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

// export the product
module.exports = Product;