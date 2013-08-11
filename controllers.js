var shortener = require('./shortener');
var redis = require('redis').createClient();
var Url;

exports.setup = function(app, db) {
    Url = db.model('Url');
};

exports.index = function (req, res) {
    var context = {
        'title': "Homepage",
    };

    res.render('index', context);
};

function makeNewRedirectPair(sourceUrl, res) {
    shortener.shorten(sourceUrl, function(contextualUrl, err) {
        var newUrl = new Url({
            sourceUrl: sourceUrl,
            contextualUrl: contextualUrl
        });
        newUrl.save(function(err) {
            if (err) {
                return res.json(500, {message: 'internal error saving new url'});
            } else {
                return res.json(200, {
                    url: newUrl.contextualUrl
                });
            }
        });
    });
}

exports.submit = function (req, res) {
    var sourceUrl = req.body.url;
    Url.findOne({sourceUrl: sourceUrl}, function(err, url) {
        if (err) {
            return res.json(500, {message: 'internal error findOne url'});
        } else {
            if (url) {
                return res.json(200, {
                    url: url.contextualUrl
                });
            } else {
                makeNewRedirectPair(sourceUrl, res);
            }
        }
    });
};

exports.redirect = function (req, res) {
    var contextualUrl = req.params.contextualUrl;
    console.log('contextualUrl ' + contextualUrl);
    Url.findOne({contextualUrl: contextualUrl}, function(err, url) {
        if (err) {
            // @TODO better error handling
            return res.json(500, {message: 'internal error'});
        } else {
            if (url) {
                return res.redirect(url.sourceUrl);
            } else {
                // @TODO better error handling
                return res.json(404, {message: 'not found'});
            }
        }
    });
};
