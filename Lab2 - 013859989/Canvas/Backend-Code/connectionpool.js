var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'GHE@ta91',
    database: 'Luckycmpe273'
});

module.exports = pool;