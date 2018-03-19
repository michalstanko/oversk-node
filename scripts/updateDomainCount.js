const fs = require('fs');

module.exports = function (path, regex, numDomains) {
    return new Promise(function (resolve, reject) {

        fs.readFile(path, 'utf8', function (err, contents) {
            if (err) {
                return reject(err);
            }

            
        });

    });
};
