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

function getsSortedScoreMap(scoreMap) {
    // Runtime: O(n*log(n)) where n = number of keys in scoreMap
    var values = Object.values(scoreMap);
    var sortedValues = values.sort();
    var sortedScoreMap = [];

    var keysByValue = {};
    // Runtime: O(numberOfKeysInscoreMap)
    for (var key in scoreMap) {
        if (scoreMap.hasOwnProperty(key)) {
            if (!keysByValue.hasOwnProperty( scoreMap[key] )) {
                keysByValue[scoreMap[key]] = [];
            }
            keysByValue[scoreMap[key]].push(key);
        }
    }

    console.log(JSON.stringify(sortedScoreMap));
    return sortedScoreMap;
}

// Get the first N most 'important' words and place them in 'mostImportantWords' array
function getMostImportantWords(sortedFrequencyMap) {
    return sortedFrequencyMap;
}

// Perform TFIDF on terms (list of words)
shortener.tfidf = function (words, cb) {
    var frequencyMap = getFrequencyMap(words);
    var scoreMap = getScoreMap(frequencyMap);
    var sortedFrequencyMap = getSortedFrequencyMap(scoreMap);
    cb.call(this, getMostImportantWords(sortedFrequencyMap));
};

// @TODO - make this awesomer
shortener.create = function (importantTerms) {
    var end = importantTerms.length > 5 ? 5 : importantTerms.length;
    return importantTerms.splice(0, end).join('-');
};

exports.shorten = shortener.shorten;
