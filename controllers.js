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
            return res.json(200, {
                url: url.destinationUrl.toLowerCase(),
                message: 'success'
            });
        } else {
            shortener.shorten(sourceUrl, function(destinationUrl, err) {
                if (!destinationUrl) {
                    console.log('destinationUrl is null!');
                    res.status(500);
                    return res.end();
                } else {
                    var newUrl = new Url({
                        sourceUrl: sourceUrl,
                        destinationUrl: destinationUrl.toLowerCase()
                    });
                    console.log('shortener shorten callback about to save newUrl = ' + JSON.stringify(newUrl));
                    newUrl.save(function(err) {
                        if (err) { 
                            console.log('error saving to mongodb' + JSON.stringify(err)); 
                            res.status(500);
                            return res.end();
                        } else {
                            console.log('mongo should have created doc with destinationUrl ' + newUrl.destinationUrl);
                            return res.json(200, {
                                message: message,
                                url: destinationUrl.toLowerCase()
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
    Url.findOne({destinationUrl: destinationUrl.toLowerCase()}, function(err, url) {
        console.log('redirect findOne err = ' + err + ' url = ' + JSON.stringify(url));
        if (url) {
            return res.redirect(url.sourceUrl);
        } else {
            return res.json(500, {});
        }
    });
};
