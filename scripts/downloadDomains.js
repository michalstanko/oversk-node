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
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36"
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
