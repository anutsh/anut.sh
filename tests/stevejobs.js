var request = require('request');
request('http://en.wikipedia.org/wiki/Steve_Jobs', function(err, res, body) {
    console.log('err = ' + err);
    console.log('res = ' + (body));
});
