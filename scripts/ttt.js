// Dummy file for running quick tests
// Enter anything here...
var connection = require('./dbConnection');
var query = require('./query');

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
	},
	{
		name: 'news.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'news2.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'zzz.sk',
		registrarId: 'MICH-0598',
		ownerId: 'MICH-0598',
		status: 'DOM_OK'
	}
];

var insertData = domains.map(function (item) {
	return [item.name];
});

var sql = {
	delete: "DELETE FROM domains",
	insert: "INSERT INTO domains (domain_name) VALUES ?"
};

console.log(insertData);

query(connection, sql.delete)
.then(function () {
	return query(connection, sql.insert, insertData);
}).then(function (result) {
	console.log('insert result: ', result);
	connection.end();
}).catch(function (err) {
	console.log('error: ', err);
	connection.end();
});


/*
connection.query(sql.delete, function (err, result) {
	if (err) {
		return console.log(err);
	}
	console.log(result);
	connection.query(sql.insert, [insertData], function (err, result) {
		if (err) {
			return console.log(err);
		}
		console.log(result);
	});
	connection.end();
});
*/