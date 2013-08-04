var restler = require('restler');
var redis = require('redis').createClient();

var ENDPOINT = 'http://localhost:4000/';

var urls = [
    'http://www.independent.ie/irish-news/courts/fbi-bids-to-extradite-largest-childporn-dealer-on-planet-29469402.html',
    'http://playdoh.readthedocs.org/en/latest/',
    'http://kenkeiter.com/skeuocard/',
    'https://medium.com/code-adventures/438bce155dcb',
    'http://news.cnet.com/8301-13578_3-57596791-38/fbi-pressures-internet-providers-to-install-surveillance-software/',
    'http://www.clojure.net/2013/02/02/Comonads/',
    'http://mobile.nytimes.com/blogs/bits/2013/08/02/a-cheap-spying-tool-with-a-high-creepy-factor/?from=global.home',
    'http://www.gizmodo.com.au/2013/07/how-scientists-stopped-light-dead-for-a-whole-minute/',
    'http://www.slate.com/blogs/moneybox/2013/08/03/pensions_included_boston_globe_sold_for_40_billion.html',
    'http://nightcode.info/',
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
    'http://en.wikipedia.org/wiki/Apple_Inc',
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
    'http://www.wired.com/autopia/2013/08/current-affair-2/',
    'http://www.theguardian.com/technology/2013/aug/04/bradley-manning-case-credibility-computer-fraud-law',
    'http://www.kroah.com/log/blog/2013/08/04/longterm-kernel-3-dot-10/',
    'http://www.theguardian.com/commentisfree/2013/aug/04/congress-nsa-denied-access',
    'http://allthingsd.com/20130803/obama-vetoes-apple-product-ban/',
    'https://medium.com/geek-empire-1/a1ebd2b4a0e5',
    'http://www.bbc.co.uk/news/magazine-23547802',
    'http://torrentfreak.com/2919-movie-pirates-walk-free-as-bittorrent-trolling-scheme-falls-apart-130802/',
    'http://www.wired.com/underwire/2013/08/xkcd-time-comic/',
    'http://spritesmods.com/?art=hddhack',
    'http://nerdydata.tumblr.com/post/57308630996/how-we-found-all-of-optimizleys-clients'
];

function makeRequests(urls) {
    if (!urls || urls.length === 0) {
        process.exit();
    }
    var url = urls.pop();
    console.log('Making request to url ' + url);
    restler.post(ENDPOINT, {data: {url: url}}).on('complete', function(res) {
        console.log('res = ' + JSON.stringify(res));
        makeRequests(urls);
    });
}

redis.flushall(function(){
    makeRequests(urls);
});
