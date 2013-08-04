var request = require('request');
var ENDPOINT = 'http://localhost:4000/';
var urls = [
    'http://www.wired.com/underwire/2013/08/xkcd-time-comic/',
    'http://www.wired.com/gadgetlab/2013/08/what-is-rockmelt/',
    'http://www.wired.com/threatlevel/2013/07/google-neutrality/',
    'http://www.wired.com/rawfile/2013/07/can-detroits-architectural-past-inspire-it-to-claw-its-way-back-to-greatness/',
    'http://www.wired.com/gamelife/2013/07/final-fantasy-is-dead/',
    'http://www.wired.com/design/2013/08/sam-hecht-on-getting-back-to-simple-efficient-design/',
    'http://www.wired.com/opinion/2013/07/the-surprising-ethics-of-robot-cars/',
    'http://www.wired.com/design/2013/07/8-epic-landscapes-of-the-same-tiny-house/',
    'http://www.wired.com/autopia/2013/08/current-affair-2/'
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
