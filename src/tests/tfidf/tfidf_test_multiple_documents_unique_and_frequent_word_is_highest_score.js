var tfidf = require('../tfidf');
var redis = require('redis').createClient();

function runTest() {
    var totalTermCount = 0;
    for (var prop in documents[documents.length - 1]) {
        if (documents[documents.length - 1].hasOwnProperty(prop)) {
            totalTermCount+=documents[documents.length-1][prop];
        }
    }
    tfidf.getScores(documents[documents.length-3], totalTermCount, function(scores) {
        tfidf.getScores(documents[documents.length-2], totalTermCount, function(scores) {
            tfidf.getScores(documents[documents.length-1], totalTermCount, function(scores) {
                var fail = false;
                for (var param in scores) {
                    if (scores.hasOwnProperty(param)) {
                        // one, two, three, and four are the same
                        if (scores.one !== scores.two || scores.one !== scores.three || scores.one !== scores.four) {
                            fail = true;
                        }
                        // six is higher than five
                        if (scores.six <= scores.five) {
                            fail = true;
                        }
                        // five is higher than four
                        if (scores.five <= scores.four) {
                            fail = true;
                        }
                    }
                }
                console.log('Test has pased: ' + (fail === false));
                process.exit();
            });
        });
    });
}

var documents = [];
documents.push({
    'one': 1,
    'two': 1,
    'three': 1,
    'four': 1
});

documents.push({
    'one': 1,
    'two': 1,
    'three': 1,
    'four': 1
});

documents.push({
    'one': 1,
    'two': 1,
    'three': 1,
    'four': 1,
    'five': 1,
    'six': 2
});

var keysServiced = 0;
for (var key in documents[documents.length - 1]) {
    if (documents[documents.length - 1].hasOwnProperty(key)) {
        (function(key) {
            redis.set(key, 0, function(err, res) {
                keysServiced++;
                if (keysServiced === Object.keys(documents[documents.length - 1]).length) {
                    return runTest();
                }
            });
        })(key);
    }
}

