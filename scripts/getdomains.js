var downloadDomainsArchive = require('./download-domains-archive');
var extractGz = require('./extract-gz');

var IS_DEV_MODE = process.env.MODE === "dev";
var DOMAINS_ARCHIVE_URL = 'https://www.sk-nic.sk/documents/domeny_1.txt.gz';
var DOMAINS_ARCHIVE_FILENAME = 'domains-{{time}}.txt.gz';

var getTimeString = function (dateObj) {
	return dateObj.toISOString().replace(/[\.:]/g, '-');
};

var getDomainsArchiveFilename = function (filenameTmpl) {
	return filenameTmpl.replace('{{time}}', getTimeString(new Date()));
};

// Mock file download for development purposes
// to prevent re-downloading the file every time:
if (process.env.MODE === "dev") {
	downloadDomainsArchive = function () {
		return new Promise(function (resolve, reject) {
			resolve({
				path: 'domains-2015-09-19T13-54-16-566Z.txt.gz'
			});
		});
	};
}

downloadDomainsArchive(DOMAINS_ARCHIVE_URL, getDomainsArchiveFilename(DOMAINS_ARCHIVE_FILENAME))
.then(function (output) {
	console.log('looks like the file download is finished: ', output);
	var to = output.path.replace('.gz', '');
	return extractGz(output.path, to);
}).then(function (output) {
	console.log('Extracted archive to %s', output.path);
}).catch(function (err) {
	console.log('___err___: ', err);
});



/*
var downloadDomainArchive = function () {
	return new Promise(function (fulfill, reject) {
		fulfill("hello over.sk");
	});
};

downloadDomainArchive()
.then(function (output) {
	console.log(output);
});
*/

/*
.then(unpackDomainArchive)
.then(parseDomainsFile)
.then(insertDomains)
.then(updateModifiedDate)
.then(sendEmailReport);*/