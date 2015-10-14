var connection = require('./dbConnection');
var query = require('./query');
var sliceArray = require('./sliceArray');

const insertDataSliceLength = 3;

var sql = {
	delete: "DELETE FROM domains",
	reset:  "ALTER TABLE domains AUTO_INCREMENT = 1",
	insert: "INSERT INTO domains (domain_name) VALUES ?"
};

// Empty the domains table
// Resolves with the number of deleted rows.
var deleteDomains = function () {
	return query(connection, sql.delete).then(function (result) {
		return {
			numDeletedRows: result.affectedRows
		};
	});
};

// TODO: hide this function
module.exports.deleteDomains = deleteDomains;

// Reset AUTO_INCREMENT value
var resetDomainsTable = function () {
	return query(connection, sql.reset).then(function (result) {
		return {
			resetSuccess: true
		};
	});
};

// TODO: hide this function
module.exports.resetDomainsTable = resetDomainsTable;

// Insert domains:
// domains (Array): array of domains (objects with properties)
// Resolves with the number of inserted rows.
module.exports.insertDomains = function (domains) {
	// Prepare the array with data - will be passed to MySQL query:
	var insertData = domains.map(function (item) {
		return [item.name];
	});

	// Prepare slices (to avoid MySQL's 'ER_NET_PACKET_TOO_LARGE' error)
	var slicedInsertData = sliceArray(insertData, insertDataSliceLength);

	// TODO: call deleteDomains() and resetDomainsTable() here...
	return Promise.all(slicedInsertData.map(function (data) {
		return query(connection, sql.insert, data);
	})).then(function (result) {
		var numInsertedRows = 0;
		result.forEach(function (item) {
			numInsertedRows += item.affectedRows;
		});
		return {
			numInsertedRows: numInsertedRows
		};
	});

};
