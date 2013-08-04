var request = require('request');
request('http://en.wikipedia.org/wiki/World_War_2', function(err, res, body) {
    console.log('err = ' + err);
    console.log('res = ' + (body));
});
