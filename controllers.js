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
        console.log('submit Url.findOne url = ' + url + ' err = ' + JSON.stringify(err));
        if (err) {
            console.log('err getting url');
            res.status(500);
            return res.end();
        }
        if (url) {
            return res.redirect(url.destinationUrl);
        } else {
            console.log('about to shorten.shorten on sourceUrl = ' + sourceUrl);
            shortener.shorten(sourceUrl, function(destinationUrl, err) {
                if (!destinationUrl) {
                    console.log('destinationUrl is null!');
                    res.status(500);
                    return res.end();
                } else {
                    var newUrl = new Url({
                        sourceUrl: sourceUrl,
                        destinationUrl: destinationUrl
                    });
                    newUrl.save(function(err) {
                        if (err) { 
                            console.log('error saving to mongodb' + JSON.stringify(err)); 
                            res.status(500);
                            return res.end();
                        } else {
                            return res.json(200, {
                                message: message,
                                url: destinationUrl
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.redirect = function (req, res) {
    var destinationUrl = req.params.destinationUrl;
    console.log('destinationUrl = ' + destinationUrl);
    Url.findOne({destinationUrl: destinationUrl}, function(err, url) {
        if (err) {
        } else {
            if (url) {
                return res.json(200, {
                    message: 'success',
                    url: destinationUrl
                });
            }
        }
    });
};
