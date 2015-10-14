// Dummy file for running quick tests
// Enter anything here...
var connection = require('./dbConnection');
var db = require('./db');
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
		name: 'abeceda.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'alicante.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'cukor.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'denia.sk',
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
		name: 'opera.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'preco.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'qqq.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'rrrr.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'trnava.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'ttt.sk',
		registrarId: 'ABCD-0001',
		ownerId: 'ABCD-0001',
		status: 'DOM_OK'
	},
	{
		name: 'zaracha.sk',
		registrarId: 'MICH-0598',
		ownerId: 'MICH-0598',
		status: 'DOM_OK'
	},
	{
		name: 'zzz.sk',
		registrarId: 'MICH-0598',
		ownerId: 'MICH-0598',
		status: 'DOM_OK'
	}
];

var sql = {
	delete: "DELETE FROM domains",
	reset:  "ALTER TABLE domains AUTO_INCREMENT = 1",
	insert: "INSERT INTO domains (domain_name) VALUES ?"
};

db.deleteDomains()
.then(db.resetDomainsTable)
.then(function () {
	// TODO: make this prettier
	return db.insertDomains(domains);
})
.then(function (result) {
	console.log('INSERT result:\n', result);
}).catch(function (err) {
	console.log('error: ', err);
}).then(function () {
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
