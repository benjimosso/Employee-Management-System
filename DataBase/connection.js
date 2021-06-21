const mysql = require('mysql2');



// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'password123',
    database: 'mgmEmployee_db',
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;