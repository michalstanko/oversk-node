var downloadDomainsArchive = require('./download-domains-archive');
var extractGz = require('./extract-gz');

const isDevMode              = process.env.MODE === "dev";
const domainsArchiveUrl      = 'https://www.sk-nic.sk/documents/domeny_1.txt.gz';
const domainsArchiveFilename = 'domains-{{time}}.txt.gz';

var getTimeString = function (dateObj) {
	return dateObj.toISOString().replace(/[\.:]/g, '-');
};

var getDomainsArchiveFilename = function (filenameTmpl) {
	return filenameTmpl.replace('{{time}}', getTimeString(new Date()));
};

// Mock file download for development purposes
// to prevent re-downloading the file every time:
if (isDevMode) {
	downloadDomainsArchive = require('./download-domains-archive-mock');
}

downloadDomainsArchive(domainsArchiveUrl, getDomainsArchiveFilename(domainsArchiveFilename))
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