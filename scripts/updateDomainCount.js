const fs = require('fs');

/**
 * Update domain count in HTML file
 * @param {string} path Path to HTML file where domain count needs to be updated
 * @param {regex} regex Regular expression to find HTML snippet that contains domain count
 * @param {number} numDomains Number of registered domains - will be inserted into the passed HTML file
 */
module.exports = function (path, regex, numDomains) {
    return new Promise(function (resolve, reject) {

        fs.readFile(path, 'utf8', function (err, html) {
            var oldElement = '';
            var oldCount = '';
            var newCount = '';
            var newElement = '';

            if (err) {
                return reject(err);
            }

            var match = html.match(regex);
            if (match && match.length) {
                oldElement = match[0];
                oldCount = match[1];
                newCount = numDomains.toLocaleString().replace(/,/, ' ');
                newElement = oldElement.replace(oldCount, newCount);
                html = html.replace(oldElement, newElement);
                fs.writeFile(path, html, function (err) {
                    if (err) {
                        return reject(`Update domain count error: could not write to file ${path}`);
                    }
                    resolve(newElement);
                });
            } else {
                reject(`Update domain count error: regular expression returned no match in HTML file ${path}`);
            }
        });

    });
};
