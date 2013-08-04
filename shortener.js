var fs = require('fs'),
    readability = require('readability'),
    natural = require('natural'),
    request = require('request'),
    S = require('string'),
    _ = require('underscore'),
    shortener = {};

shortener.shorten = function (url, cb) {
    if (!url) {
        cb.call(this, undefined, 'invalid url');
    }

    shortener.extract(url, function (article) {
        shortener.filter(article.s, function(words) {
            shortener.tfidf(words, function (terms) {
                cb.call(this, shortener.create(terms), undefined);
            });
        });
    });
};

shortener.extract = function (url, cb) {
    console.log('parsing url = ' + url);
    var content = request(url, function (err, res, body) {
        readability.parse(body, url, function (result) {
            var article = S(result.content).stripTags();
            cb.call(this, article);
        });
    });
};

// Filter the plaintext content of the article
shortener.filter = function (content, cb) {
    var tokenizer = new natural.WordTokenizer();
    var terms = tokenizer.tokenize(content);
    cb.call(this, terms);
};

function getFrequencyMap(words) {
    var frequencyMap = {};

    for (var i = 0; i < words.length; i++) {
        if(frequencyMap[words[i]] === undefined) {
            frequencyMap[words[i]] = 1;
        } else {
            frequencyMap[words[i]] += 1;
        }
    }

    return frequencyMap;
}

function getScoreMap(frequencyMap) {
    // @TODO: run tfidf.getScores(frequencyMap);
    return frequencyMap;
}

function getSortedScoreMap(scoreMap) {
    var sortable = [];
    for (var key in scoreMap) {
        if (scoreMap.hasOwnProperty(key)) {
            sortable.push([key, scoreMap[key]]);
        }
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
}

// Get the first N most 'important' words and place them in 'mostImportantWords' array
function getMostImportantWords(sortedFrequencyMap) {
    return sortedFrequencyMap;
}

// Perform TFIDF on terms (list of words)
shortener.tfidf = function (words, cb) {
    var frequencyMap = getFrequencyMap(words);
    var scoreMap = getScoreMap(frequencyMap);
    var sortedScoreMap = getSortedScoreMap(scoreMap);
    cb.call(this, getMostImportantWords(sortedScoreMap));
};

// @TODO - make this awesomer
shortener.create = function (importantTerms) {
    var end = importantTerms.length > 5 ? 5 : importantTerms.length;
    return importantTerms.splice(0, end).join('-');
};

exports.shorten = shortener.shorten;
