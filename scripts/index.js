var downloadDomains = require('./downloadDomains');
var extractGz       = require('./extractGz');
var readDomains     = require('./readDomains');

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
	downloadDomains = require('./downloadDomainsMock');
}

// This is where the magic happens:
downloadDomains(domainsArchiveUrl, getDomainsArchiveFilename(domainsArchiveFilename))
.then(function (output) {
	var to = output.path.replace('.gz', '');
	return extractGz(output.path, to);
}).then(function (output) {
	console.log('Extracted archive to %s', output.path);
	return readDomains(output.path);
}).then(function (out) {
	var domains = out.domains;
	console.log(domains.length);
}).catch(function (err) {
	console.log('Error: ', err);
});

/*
The plan is:

downloadDomains()
.then(extractDomains)
.then(parseDomainsFile)
.then(insertDomains)
.then(updateModifiedDate)
.then(sendEmailReport);
*/