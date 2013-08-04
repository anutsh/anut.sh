var redis = require('redis').createClient();
var tfidf = {};

function updateBackground (documentTerms, cb) {
    var totalVal = 0;
    var keysServiced = 0;
    for (var key in documentTerms) {
        var value = parseInt(documentTerms[key], 10);
        totalVal += value;

        redis.get(key, function (err, res) {
            var delta = 0;
            if(res === null) {
                delta = value;
            } else {
                delta = parseInt(res, 10) + value;
            }
            redis.set(key, delta, function(err, res) {
                if(err) {
                    // TODO: log error
                }
                keysServiced++;
                if (keysServiced === documentTerms.length) {
                    redis.get("TOTAL_KEY", function (err, res) {
                        var totalKeyDelta = 0;
                        if(res === null) {
                            // key does not exist. set a new key-value pair.
                            totalKeyDelta = totalVal;
                        } else {
                            // key exists. update the value.
                            totalKeyDelta = parseInt(res, 10) + totalVal;
                        }
                        redis.set("TOTAL_KEY", totalKeyDelta, function(err, res) {
                            if (err) {
                                // TODO: log error
                            }
                            return cb(totalKeyDelta);
                        });
                    });
                }
            });
        });
    }
}

// documentTerms: {term:count, term2:count2, ... } 
tfidf.getScores = function (documentTerms, totalTermCount, cb) {
    updateBackground(documentTerms, function(backgroundTotal) {
        var score = {};

        var keysServiced = 0;

        var getCallback = function(err, res) {
            score[key] = ((value+1)/(backgroundTotal+20000)) / totalTermCount / parseInt(res, 10);
            keysServiced ++;
            if (keysServiced === documentTerms.length) {
                return cb(score);
            }
        };
        for (var keyIndex = 0; keyIndex < documentTerms.legth; keyIndex++) {
            var key = documentTerms[keyIndex];
            var value = parseInt(documentTerms[key], 10);
            redis.get(key, getCallback);
        }
    });
};

exports.getScores = tfidf.getScores;
