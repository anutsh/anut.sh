var fs = require('fs'),
    readability = require('readability'),
    natural = require('natural'),
    request = require('request'),
    S = require('string'),
    shortener = {};

shortener.shorten = function (url, cb) {
    if (!url) {
        cb.call(this, 'invalid url');
    }

    shortener.extract(url, function (article) {
        shortener.tfidf(article.s, function (terms) {
            cb.call(this, shortener.create(terms), undefined);
        });
    });
}

shortener.extract = function (url, cb) {
    console.log('parsing url = ' + url);
    var content = request(url, function (err, res, body) {
        readability.parse(body, url, function (result) {
            var article = S(result.content).stripTags();
            cb.call(this, article);
        });
    });
};

shortener.tfidf = function (article, cb) {
    var TfIdf = natural.TfIdf,
        tfidf = new TfIdf(),
        terms = [];

    // Add our article
    tfidf.addDocument(article);

    cb.call(this, ['common', 'words', 'here']);
};

shortener.create = function (terms) {
    var end = terms.length > 5 ? 5 : terms.length;
    return terms.splice(0, end).join('-');
};

exports.shorten = shortener.shorten;
