var fs = require('fs');
var zlib = require('zlib');

module.exports = function (from, to) {
	return new Promise(function (resolve, reject) {
		fs.createReadStream(from)
		.pipe(zlib.createGunzip())
		.on('error', function (err) {
			reject(err);
		})
		.pipe(fs.createWriteStream(to))
		.on('finish', function () {
			resolve({
				path: to
			});
		});
	});
};
