const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

// use the products JSON file 
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

// get all products from the file 
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

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
  // save/write to file
  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        // create a random ID for the product 
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }
  // delete the product based on the ID of the product
  static deleteById(id) {
    //get the product from the file 
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          //use the deleteProduct method from the Cart
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  // get all Products
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  // find a product based on the ID
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
