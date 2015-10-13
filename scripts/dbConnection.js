// MySQL connection management
var mysql = require('mysql');

// MySQL connection settings (read from env vars):
var connectionConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
};

module.exports = mysql.createConnection(connectionConfig);