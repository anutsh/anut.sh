var request = require('request');
var ENDPOINT = 'http://localhost:4000/';
var urls = [
    'http://www.independent.ie/irish-news/courts/fbi-bids-to-extradite-largest-childporn-dealer-on-planet-29469402.html',
    'http://playdoh.readthedocs.org/en/latest/',
    'https://kerricklong.com/articles/why-ember-js-rocks.html',
    'http://techcrunch.com/2013/08/02/university-of-california-approves-major-open-access-policy-to-make-research-free',
    'http://www.mailpile.is/',
    'https://blog.pinboard.in/2013/08/thoughts_on_colocation/'
];

for (var i = 0; i < urls.length; i++) {
    var urlsServiced = 0;
    (function(i) {
        setTimeout(function() {
            console.log('making request to ' + urls[i]);
            request.post(ENDPOINT, {form:{url: urls[i]}}, function(error, response, body) {
                console.log('response = ' + (body));
                urlsServiced++;
                if (urlsServiced === urls.length) {
                    process.exit();
                }
            });
        }, 500);
    })(i);
}
