var downloadDomains = require('./downloadDomains');
var extractGz       = require('./extractGz');
var readDomains     = require('./readDomains');
var db              = require('./db.js');
var sendMail        = require('./sendMail');

const isDevMode              = process.env.MODE === "dev";
const domainsArchiveUrl      = 'https://www.sk-nic.sk/documents/domeny_1.txt.gz';
const domainsArchiveFilename = 'domains-{{time}}.txt.gz';
const emailAddress           = process.env.EMAIL_USER;

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
	var extractTo = output.path.replace('.gz', '');
	return extractGz(output.path, extractTo);
}).then(function (output) {
	return readDomains(output.path);
}).then(function (output) {
	// DB insert:
	var domains = output.domains;
	return db.insertDomains(domains);
}).then(function (output) {
	// Send DB-insert report:
	return sendMail({
		from: emailAddress,
		to: emailAddress,
		subject: 'over.sk insert ' + (new Date()).toUTCString(),
		text: 'numInsertedRows: ' + output.numInsertedRows
	});
}).then(function (output) {
	// Mailgun send mail output:
	console.log('Mailgun: ', output);
}).catch(function (err) {
	console.log('Error: ', err);
});

/*
The plan is:

downloadDomains() DONE
.then(extractDomains) DONE
.then(parseDomainsFile) DONE
.then(insertDomains) DONE
.then(updateModifiedDate) TODO
.then(sendEmailReport); TODO
*/
