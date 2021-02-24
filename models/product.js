
const db = require('../util/database');
const Cart = require('./cart');


// export the Product class. 
//set the id, title, imageURL, description, price
// save/write to file
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  // save/write to the database
  // use the '?' to prevent SQL Injection and the array will populate the hidden SQL data 
  save() {
      return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)', 
        [this.title, this.price, this.imageUrl, this.description]
      );
  }
  // delete the product based on the ID of the product
  static deleteById(id) {
    //get the product from the database


  }

  // get all Products from database
  static fetchAll() {
      return db.execute('SELECT * FROM products');
  }

  // find a product based on the ID
  static findById(id) {
      return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
