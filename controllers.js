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

exports.submit = function (req, res) {
    var sourceUrl = req.body.url;
    var message = "success";

    console.log('processing ' + sourceUrl);
    Url.findOne({sourceUrl: sourceUrl}, function(err, url) {
        if (err) {
            console.log('err getting url');
            res.status(500);
            return res.end();
        }
        if (url) {
            console.log('already have ' + sourceUrl + ' in Mongo, returning cached contextual url');
            return res.json(200, {
                'message': message,
                'url': url.destinationUrl
            });
        }
        shortener.shorten(sourceUrl, function (url, err) {
            if (err) {
                return res.json(400, { 'message': err });
            }
            var newUrl = new Url({
                sourceUrl: sourceUrl,
                destinationUrl: url
            });
            newUrl.save(function saveUrl(err) {
                if (err) {
                    console.log('error saving new url ' + JSON.stringify(err));
                }
                return res.json(200, {
                    'message': message,
                    'url': url
                });
            });
        });
    });
};

exports.redirect = function (req, res) {
    var destinationUrl = req.params.destinationUrl;
    console.log('redirect destinationUrl = ' + destinationUrl);
    Url.findOne({destinationUrl: destinationUrl}, function(err, url) {
        if (err) {
            console.log('redirect error err = ' + JSON.stringify(err));
        }
        console.log('url = ' + JSON.stringify(url));
        if (url) {
            return res.redirect(url.sourceUrl);
        }
        res.status(404);
        return res.end();
    });
};
