var mysql = require('mysql');

// MySQL connection settings (read from env vars):
var connectionConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
};

var sql = {
	delete: "DELETE FROM domains",
	insert: "INSERT INTO domains (domain_name) VALUES ?"
};

// MySQL connection:
var connection = mysql.createConnection(connectionConfig);

// Empty the domains table
// Resolves with the number of deleted rows.
var deleteDomains = function () {
	return new Promise(function (resolve, reject) {
		connection.query(sql.delete, function (err, result) {
			if (err) {
				reject(err);
				return;
			}

			resolve({
				numDeletedRows: result.affectedRows
			});
		});
	}); // end: new Promise
};

// Insert domains:
// domains (Array): array of domains (as key/value objects)
// Resolves with the number of inserted rows.
module.exports.insertDomains = function (domains) {
	// Prepare the array with data - will be passed to MySQL query:
	var insertData = domains.map(function (item) {
		return [item.name];
	});

	return deleteDomains().then(function (output) {
		var numInsertedRows = 0;
		return new Promise(function (resolve, reject) {
			// TODO: doesn't work!
			// TODO: MySQL connection not closed correctly
			insertData.forEach(function (data) {
				connection.query(sql.insert, [data], function (err, result) {
					if (err) {
						reject(err);
					} else {
						numInsertedRows += result.affectedRows;
					}
				});
			});

			resolve({
				numDeletedRows: output.numDeletedRows,
				numInsertedRows: numInsertedRows
			});

		}).then(function () {
			// TODO this is probably not closing connections correctly
			// when there's an error - check!!!
			connection.end();
		}); // end: new Promise
	});
};
