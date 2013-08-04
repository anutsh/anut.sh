var tfidf = require('../tfidf');
var redis = require('redis').createClient();
/*
var numDocuments = 3;
var MAX_NUM_TERMS = 10;
var MAX_TERM_VALUE = 100;

var documentTerms = [];
for (var document = 0; document < numDocuments; document++) {
    var newDocument = {};
    var numTerms = Math.floor((Math.random()*MAX_NUM_TERMS)+1);
    for (var term = 0; term < numTerms; term++) {
        var randomTermValue = Math.floor((Math.random()*MAX_TERM_VALUE)+1);
        newDocument['term' + term] = randomTermValue;
    }
    documentTerms.push(newDocument);
}
console.log('documentTerms = ' + JSON.stringify(documentTerms, null, 4));
*/
var documents = [];
documents.push({
    'one': 1,
    'two': 1,
    'three': 1,
    'four': 1
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

function runTest() {
    var totalTermCount = 0;
    for (var prop in documents[documents.length - 1]) {
        if (documents[documents.length - 1].hasOwnProperty(prop)) {
            totalTermCount+=documents[documents.length-1][prop];
        }
    }
    tfidf.getScores(documents[documents.length-1], totalTermCount, function(score) {
        console.log('i am done! score = ' + JSON.stringify(score));
    });
}


/*
documents.push({
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4
});

documents.push({
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4
});
*/
