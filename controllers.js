var shortener = require('./shortener');
var redis = require('redis').createClient();

exports.index = function (req, res) {
    var context = {
        'title': "Homepage",
    };

    res.render('index', context);
};

exports.submit = function (req, res) {
    var url = req.body.url;
    var message = "success";

    console.log(url);

    shortener.shorten(url, function (url, err) {
        if (err) res.json(400, { 'message': err });

        res.json(200,{
            'message': message,
            'url': url
        });
    });
};

exports.redirect = function (req, res) {
    alias = req.params.alias;
    
    //TODO: url = getUrl(alias);
    var url = "http://google.com";
    res.redirect(url);
};
