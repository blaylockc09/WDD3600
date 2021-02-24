/* allows us to connect to the database */

const mysql = require('mysql2');


/*  add information for the server */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_complete',
    password: 'Password!'
});

/* export the pool and use promises to handle async callbacks */
module.exports = pool.promise();