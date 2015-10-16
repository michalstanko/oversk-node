var nodemailer = require('nodemailer');

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: user,
		pass: pass
	}
});

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
