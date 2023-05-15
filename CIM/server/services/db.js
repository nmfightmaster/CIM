require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2');
const conn = mysql.createConnection({
 host: "localhost",
 user: process.env.MYSQL_USER,
 password: process.env.MYSQL_PASS,
 database: "cim",
});

conn.connect();

module.exports = conn;