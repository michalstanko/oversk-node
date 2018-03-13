var downloadDomains = require('./downloadDomains');
var extractGz       = require('./extractGz');
var readDomains     = require('./readDomains');
var db              = require('./db.js');
var sendMail        = require('./sendMail');
var log             = require('./log');

const isDevMode          = process.env.MODE === "dev";
const domainsUrl         = 'https://sk-nic.sk/subory/domains.txt';
const domainsFilenameTpl = 'domains-{{time}}.txt';
const emailAddress       = process.env.EMAIL_USER;

var store = {}; // will contain results of various operations

var getTimeString = function (dateObj) {
	return dateObj.toISOString().replace(/[\.:]/g, '-');
};

var getDomainsFilename = function (filenameTmpl) {
	return filenameTmpl.replace('{{time}}', getTimeString(new Date()));
};

// Mock file download for development purposes
// to prevent re-downloading the file every time:
if (isDevMode) {
	downloadDomains = require('./downloadDomainsMock');
}

var quickMail = function (subj, text) {
	return sendMail({
		from: emailAddress,
		to: emailAddress,
		subject: subj,
		text: text ? text : ''
	});
};

// This is where the magic happens:
downloadDomains(domainsUrl, getDomainsFilename(domainsFilenameTpl))
.then(function (output) {
	return readDomains(output.path);
}).then(function (output) {
	//console.log(output);
	// DB insert:
	var domains = output.domains;
	return db.insertDomains(domains);
}).then(function (output) {
	store.numInsertedRows = output.numInsertedRows;
	// Send DB-insert report:
	return sendMail({
		from: emailAddress,
		to: emailAddress,
		subject: 'over.sk insert ' + (new Date()).toUTCString(),
		text: 'numInsertedRows: ' + output.numInsertedRows
	});
}).then(function (output) {
	// TODO: Everything below is a mess at this moment
	// Mailgun - mail sent successfully:
	store.emailReportSent = true;
}).catch(function (err) {
	console.log('Error: ', err);
}).then(function () {
	var isoDateTime = (new Date()).toISOString();
	return log('log/insertdomains.log', isoDateTime + "\tInserted: " + store.numInsertedRows + " domains\tEmail sent: " + store.emailReportSent);
}).then(function () {
	console.log('...done, thanks, bye...');
}).catch((err) => {
	console.log('Error: ', err);
});

/*
The plan is:

downloadDomains() DONE
.then(extractDomains) DONE
.then(parseDomainsFile) DONE
.then(insertDomains) DONE
.then(updateModifiedDate) TODO
.then(sendEmailReport); DONE
*/
