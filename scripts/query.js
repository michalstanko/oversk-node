/*
Execute query.
Returns promise.
*/
var query = function (conn, sql, data) {
	return new Promise(function (resolve, reject) {
		conn.query(sql, [data], function (err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

module.exports = query;
