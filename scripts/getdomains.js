var downloadDomainsArchive = require('./download-domains-archive');

var DOMAINS_ARCHIVE_URL = 'https://www.sk-nic.sk/documents/domeny_1.txt.gz';
var DOMAINS_ARCHIVE_FILENAME = 'domains-{{time}}.txt.gz';

var getTimeString = function (dateObj) {
	return dateObj.toISOString().replace(/[\.:]/g, '-');
};

var getDomainsArchiveFilename = function (filenameTmpl) {
	return filenameTmpl.replace('{{time}}', getTimeString(new Date()));
};

downloadDomainsArchive(DOMAINS_ARCHIVE_URL, getDomainsArchiveFilename(DOMAINS_ARCHIVE_FILENAME))
.then(function (output) {
	console.log('looks like the file download is finished: ', output);
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