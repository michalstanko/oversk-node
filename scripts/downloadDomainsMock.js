/*
Pretend to have downloaded a file
*/
var fs = require('fs');

module.exports = function () {
	return new Promise(function (resolve, reject) {
		// Get the list of all .txt.gz files in the current dir:
		var files = fs.readdirSync('./').filter(function (file) {
			return /\.txt\.gz/.test(file);
		});

		if (files.length) {
			resolve({
				path: files[0] // just use the first one...
			});
		} else {
			reject(new Error("No *.txt.gz files present in the current directory"));
		}
	});
};
