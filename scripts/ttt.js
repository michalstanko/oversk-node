// Dummy file for running quick tests
// Enter anything here...
var mysql = require('mysql');

// Some dummy data...:
var domains = [
	{
		name: '00.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: '000.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'metallica.sk',
		registrarId: 'MICH-0598',
		ownerId: 'MICH-0598',
		status: 'DOM_OK'
	}
];

// MySQL connection settings (read from env vars):
var connectionConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
};

var connection = mysql.createConnection(connectionConfig);

var sql = "SELECT * ";

connection.query();