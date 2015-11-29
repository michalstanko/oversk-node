/*
Read domains file into an array

Each line of domains list has 11 fields:
01. Domain name
02. ID of the registrar
03. ID of the owner
04. NEW/OLD
05. Status
06. Name server 1
07. Name server 2
08. Name server 3
09. Name server 4
10. ICO (Slovak business registration number)
11. Valid to (date)

*/
var fs = require('fs');

module.exports = function (from) {
	return new Promise(function (resolve, reject) {

		fs.readFile(from, 'utf8', function (err, data) {
			if (err) {
				reject(err);
				return;
			}

			var lines = data.split("\n");
			var domains = [];

			lines.forEach(function (line) {
				var parts = line.split(";");
				if (parts.length >= 11 && !!~parts[0].indexOf('.sk')) {
					// TODO: add more fields:
					domains.push({
						name: parts[0],
						registrarId: parts[1],
						ownerId: parts[2],
						status: parts[4]
					});
				}
			});

			resolve({domains: domains});
		});
	});
};
