var url = require('url'),
    reddit = require('./reddit'),
    imgur = require('./imgur');

var urls = {
    'reddit.com': reddit.handle,
    'imgur.com': imgur.handle,
};

var strip = function (uri) {
    return url.parse(uri).hostname;
};

exports.dispatch = function (uri, args) {
    var href = uri.indexOf('http://') !== 0 ? 'http://' + uri : uri,
        host = strip(href);

    return urls[host].apply(this, [].concat(uri, args));
};
