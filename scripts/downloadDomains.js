/*
Download file from url specified in "from",
save it to path specified in "to"
*/
var fs = require('fs');
var url = require('url');
var https = require('https');
var extend = require('extend');

var defaultOptions = {
	requestHeaders: {
		"Referer": "https://www.sk-nic.sk/main.jsp",
		"User-Agent": "MSIE 4.0"
	}
};

module.exports = function (from, to, options) {
	var options = extend(defaultOptions, options);
	var file = fs.createWriteStream(to);
	var parsedUrl = url.parse(from);
	
	var reqOptions = {
		hostname: parsedUrl.hostname,
		path: parsedUrl.path,
		headers: options.requestHeaders
	};

	return new Promise(function (resolve, reject) {
		https.get(reqOptions, function (res) {
			res.pipe(file);

			file.on('finish', function () {
				file.close(function () {
					resolve({
						path: to
					});
				});
			});


		}).on('error', function (err) {
			fs.unlink(to); // delete file
			reject(err);
		});
	});

};
