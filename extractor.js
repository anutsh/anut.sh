var fs = require('fs'),
    readability = require('readability'),
    natural = require('natural'),
    request = require('request');

exports.extract = function (url) {
    var content = request(url, function (err, res, body) {
        readability.parse(body, url, function (article) {
            return article;
        });
    })
}

exports.tfidf = function (article) {
    var TfIdf = natural.TfIdf,
        tfidf = new TfIdf(),
        terms = [];

    // Add our article
    tfidf.addDocument(article);

    return tfidf.listTerms(0).splice(10);
}

exports.create = function (terms) {
    return terms.splice(3).join('-');
}
