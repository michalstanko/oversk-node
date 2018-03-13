/*
Read domains file into an array

Each line of domains list has 9 fields:
01. Domain name
02. ID of the registrar
03. ID of the owner
04. Status
05. Name server 1
06. Name server 2
07. Name server 3
08. Name server 4
09. Valid to (date)

*/
var fs = require('fs');
var readline = require('readline');

var numCols = 9;

module.exports = function (from) {
	return new Promise(function (resolve, reject) {
		var count = 0;
		var domains = [];
		
		var reader = readline.createInterface(fs.createReadStream(from));
		
		reader.on('line', function (line) {
			count++;
			var parts = line.split(";");
			if (parts.length >= numCols && !!~parts[0].indexOf('.sk')) {
				// TODO: add more fields:
				domains.push({
					name: parts[0],
					registrarId: parts[1],
					ownerId: parts[2],
					status: parts[3]
				});
			}
			
		}).on('close', function () {
			resolve({domains: domains});
		});

	});
};
