var extractor = require('./extractor');

exports.index = function (req, res) {
    var context = {
        'title': "Homepage",
    };

    res.render('index', context);
};

exports.submit = function (req, res) {
    var jsonObj = JSON.parse(req.param("jsonData"));
    var url = jsonObj.url;

    var article = extractor.extract(url);
    var terms = extractor.tfidf(article);

    var message = "success";

    console.log('Terms = ' + terms);

    res.json(200,{
        'message': message,
        'url': extractor.create(terms),
    });
};
