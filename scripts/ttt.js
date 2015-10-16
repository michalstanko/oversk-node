// Dummy file for running quick tests
// Enter anything here...
var sendMail = require('./sendMail');

const mailOptions = {
	from: 'michal@stankoviansky.com',
	to: 'michal@stankoviansky.com',
	subject: 'test message',
	text: 'hello there :-)'
};

sendMail(mailOptions).then(function (result) {
	console.log(result);
}).catch(function (err) {
	console.log('Error: ', err);
});
