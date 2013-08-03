var extractor = require('./extractor');

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

    if (!url) {
        var err = {'msg': 'No url given'};
        res.json(400, err);
    }

    extractor.extract(url, function (article) {
        extractor.tfidf(article.s, function (terms) {
            console.log('Terms = ' + terms);
            res.json(200,{
                'message': message,
                'url': extractor.create(terms),
            });
        });
    });
};
