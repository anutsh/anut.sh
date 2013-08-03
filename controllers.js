var extractor = require('./extractor');

exports.index = function (req, res) {
    var context = {
        'title': "Homepage",
    };

    res.render('index', context);
};

exports.submit = function (req, res) {
    var url = "http://en.wikipedia.org/wiki/Nodejs";
    var message = "success";

    var article = extractor.extract(url);

    res.json(200,{
        'message': message,
        'url': extractor.tfidf(article),
    });
};
