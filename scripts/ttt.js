var fs = require('fs');
var url = require('url');
var https = require('https');

module.exports.downloadDomains = function (from, to) {
	var file = fs.createWriteStream(to);
	var parsedUrl = url.parse(from);
	var reqOptions = {
		hostname: parsedUrl.hostname,
		path: parsedUrl.path,
		headers: {
			"Referer": "http://httpbin.org/", 
			"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36"
		}
	};
	var req = http.get(reqOptions, function (res) {
		res.pipe(file);
		file.on('finish', function () {
			file.close(function () {
				console.log('download done!!!');
			});
		});
	});
};

download('https://www.sk-nic.sk/documents/domeny_1.txt.gz', 'resp.txt');
