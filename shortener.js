var fs = require('fs'),
    natural = require('natural'),
    restler = require('restler'),
    S = require('string'),
    tfidf = require('./tfidf'),
    shortener = {};

function getFrequencyMap(words) {
    var frequencyMap = {};
    var totalTermCount = 0;

    for (var i = 0; i < words.length; i++) {
        if (!frequencyMap.hasOwnProperty(words[i])) {
            frequencyMap[words[i]] = 0;
        }
        frequencyMap[words[i]] += 1;
    }

    return {
        frequencyMap: frequencyMap,
            totalTermCount: words.length
    };
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
    return sortable;
}

// Get the first N most 'important' words and place them in 'mostImportantWords' array
function getImportantTerms(sortedScoreMap) {
    var sortedScoreSubset = sortedScoreMap.splice(1,7);
    var importantTerms = [];
    for (var i = 0; i < sortedScoreSubset.length; i++) {
        importantTerms.push(sortedScoreSubset[i][0]);
    }
    return importantTerms;
}

// @TODO - make this awesomer
shortener.create = function (sortedScoreMap) {
    var importantTerms = getImportantTerms(sortedScoreMap);
    return importantTerms.join('-');
};


shortener.shorten = function (url, cb) {
    if (!url) {
        cb.call(this, undefined, 'invalid url');
    }

    shortener.extract(url, function (article) {
        shortener.filter(article, function(words) {
            shortener.tfidf(words, function (sortedScoreMap) {
                cb.call(this, shortener.create(sortedScoreMap), undefined);
            });
        });
    });
};

shortener.extract = function (url, cb) {
    restler.get(url).on('complete', function (body) {
        var tagRegex = /(<([^>]+)>)/ig;
        var article = body.replace(tagRegex, "<>");
        var textRegex = /[a-zA-Z]+?[^<>/()\n\r]+?([a-zA-Z]+\s){3}[^<>/()\n\r]+/g;
        var match = article.match(textRegex);
        if (!match) {
            console.log('article = ' + article);
        }
        article = match.join(" ");
        article = article.replace(/[^-_a-zA-Z0-9\']+?/g, " ");
        article = article.replace(/[ ]+/g, " ");
        cb.call(this, article);
    });
};

// Filter the plaintext content of the article
shortener.filter = function (content, cb) {
    var tokenizer = new natural.WordTokenizer();
    var terms = tokenizer.tokenize(content);
    cb.call(this, terms);
};

// Perform TFIDF on terms (list of words)
shortener.tfidf = function (words, cb) {
    var freqMapObject = getFrequencyMap(words);
    tfidf.getScoreMap(freqMapObject.frequencyMap, 
            freqMapObject.totalTermCount, function(scoreMap) {
                cb.call(this, getSortedScoreMap(scoreMap));
            });
};
exports.shorten = shortener.shorten;
