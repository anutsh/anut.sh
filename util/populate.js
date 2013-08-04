var request = require('request');
var redis = require('redis').createClient();

var ENDPOINT = 'http://localhost:4000/';

var urls = [
    'http://www.independent.ie/irish-news/courts/fbi-bids-to-extradite-largest-childporn-dealer-on-planet-29469402.html',
    'http://playdoh.readthedocs.org/en/latest/',
    'http://techcrunch.com/2013/08/02/university-of-california-approves-major-open-access-policy-to-make-research-free',
    'http://www.mailpile.is/',
    'http://www.maclife.com/article/news/superspeed_usb_31_announced_could_bring_end_thunderbolt',
    'http://stackoverflow.com/questions/17527870/how-does-trello-access-the-users-clipboard',
    'http://angular-tips.com/blog/2013/08/why-does-angular-dot-js-rock/',
    'http://diydrones.com/',
    'http://www.wired.com/cars/coolwheels/magazine/15-11/ff_cannonballrun',
    'http://www.nytimes.com/2013/08/04/health/for-medical-tourists-simple-math.html?_r=0',
    'http://torrentfreak.com/2919-movie-pirates-walk-free-as-bittorrent-trolling-scheme-falls-apart-130802/',
    'http://en.wikipedia.org/wiki/Philosophy',
    'http://en.wikipedia.org/wiki/Epistemology',
    'http://en.wikipedia.org/wiki/Apple',
    'http://en.wikipedia.org/wiki/Apple_Inc.',
    'http://en.wikipedia.org/wiki/Ontology',
    'http://en.wikipedia.org/wiki/Apple_Inc.',
    'http://en.wikipedia.org/wiki/Steve_Jobs',
    'http://en.wikipedia.org/wiki/Nokia',
    'http://en.wikipedia.org/wiki/Consumer_electronics',
    'http://en.wikipedia.org/wiki/IPad',
    'http://en.wikipedia.org/wiki/Tablet_computer',
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

function makeRequests(urls) {
    if (!urls || urls.length === 0) {
        process.exit();
    }
    var url = urls.pop();
    console.log('Making request to url ' + url);
    request.post(ENDPOINT, {form: {url: url}}, function(err, res, body) {
        if (err) {
            console.log('ERROR on url ' + url + ' err = ' + JSON.stringify(err));
        }
        try {
            body = JSON.parse(body);
            if (body && body.url) {
                console.log('SUCCESS url = ' + url + ' nutsh url = ' + body.url);
            }
        } catch(e) {
            // do nothing, fuck it
        }
        makeRequests(urls);
    });
}

redis.flushall(function(){
    makeRequests(urls);
    process.exit();
});
