/*
Log message into file
*/
var fs = require('fs');

module.exports = function (path, msg) {
	return new Promise(function (resolve, reject) {
		fs.appendFile(path, "\r\n" + msg, function (err) {
			if (err) {
				reject(err)
			} else {
				resolve({
					success: true,
					message: msg
				});
			}
		});
	});
};
