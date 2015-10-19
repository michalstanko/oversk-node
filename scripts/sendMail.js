var nodemailer = require('mailgun');

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const apiKey = process.env.MAILGUN_API_KEY;

module.exports = function (options) {
	return new Promise(function (resolve, reject) {
		transporter.sendMail(options, function (err, info) {
			if (err) {
				reject(err);
			} else {
				resolve(info);
			}
		});
	});
};
