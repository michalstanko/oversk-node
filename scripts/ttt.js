// Dummy file for running quick tests
// Enter anything here...
//var sendMail = require('./sendMail');
var apiKey = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({ apiKey: apiKey, domain: domain });

const mailOptions = {
	from: 'michal@stankoviansky.com',
	to: 'michal@stankoviansky.com',
	subject: 'test message',
	text: 'hello there :-) from mailgun...'
};

mailgun.messages().send(mailOptions, function (err, body) {
	if (err) {
		throw err;
	}
	console.log(body);
});

/*
sendMail(mailOptions).then(function (result) {
	console.log(result);
}).catch(function (err) {
	console.log('Error: ', err);
});
*/