/*
Send email through mailgun.com API
*/
const apiKey  = process.env.MAILGUN_API_KEY;
const domain  = process.env.MAILGUN_DOMAIN;

var mailgun = require('mailgun-js')({ apiKey: apiKey, domain: domain });

module.exports = function (options) {
	return new Promise(function (resolve, reject) {
		mailgun.messages().send(options, function (err, body) {
			if (err) {
				reject(err);
			} else {
				resolve(body);
			}
		});
	});
};
