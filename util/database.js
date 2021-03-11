//get rid of sequelize and replace with mongoDB
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// init the _db variable to maintain our connection so that we are not opening multiple connections to the dB.
let _db; 

// connect to mongoDB
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://blaylock:passwordpassword1@cluster0.x59f4.mongodb.net/shop?retryWrites=true&w=majority',{useUnifiedTopology: true})
.then(client => {
    console.log('Connected!');
    _db = client.db();
    callback();
})
.catch(err => {
    console.log(err);
    throw err;
});
};

// check if the db is defined. 
const getDb = () => {
  if (_db) {
      return _db;
  } 
  throw 'No Database found!'; 
};

// export the methods 
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;