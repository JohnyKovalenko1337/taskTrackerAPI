const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"tasks",
    password: "ty7ui",

});

module.exports = pool.promise();