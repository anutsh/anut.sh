var fs = require('fs'),
    readability = require('readability'),
    natural = require('natural');

exports.extract = function (content) {
    readability.parse(url, function (article) {
        return result;
    });
}

exports.tfidf = function (article) {
    var TfIdf = natural.TfIdf,
        tfidf = new TfIdf(),
        terms = [];

    // Add our article
    tfidf.addDocument(article);

    return tfidf.listTerms(0).splice(10);
}
