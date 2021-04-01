const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// create the product class and define the constructor
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);


// comment out old code that was used in previous modules


/* const mongodb = require('mongodb');
//const getDb = require('../util/database').getDb;

// create the product class that we will use to save and retrieve from the DB.
class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }
// save the product to the database 
save() {
  const db = getDb();
  let dbOp;
  if (this._id) {
    // Update the product
    dbOp = db
      .collection('products')
      .updateOne({ _id: this._id }, { $set: this });
  } else {
    dbOp = db.collection('products').insertOne(this);
  }
  return dbOp
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

  // get all of the products from the database.
  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
  // find a product by the id
  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }
  // delete the product based on the ID 
  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}


// remove sequelize

// export the product
module.exports = Product; */