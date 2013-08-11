var tfidf = require('../tfidf');
var redis = require('redis').createClient();

var documents = [];
documents.push({
    'one': 1,
    'two': 1,
    'three': 1,
    'four': 5
});


function runTest() {
    var totalTermCount = 0;
    for (var prop in documents[documents.length - 1]) {
        if (documents[documents.length - 1].hasOwnProperty(prop)) {
            totalTermCount+=documents[documents.length-1][prop];
        }
    }
    tfidf.getScores(documents[documents.length-1], totalTermCount, function(scores) {
        var fail = false;
        for (var param in scores) {
            if (scores.hasOwnProperty(param)) {
                if (param !== 'four' && 
                    scores[param] >= scores.four) {
                    fail = true;
                }
            }
        }
        var success = (fail === false);
        console.log('Test has pased: ' + success);
        process.exit(success);
    });
}

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
