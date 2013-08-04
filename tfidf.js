var redis = require('redis').createClient();
var tfidf = {};

function updateBackground (documentTerms, cb) {
    var totalVal = 0;
    var keysServiced = 0;
    var documentTermsLength = Object.keys(documentTerms).length;
    for (var key in documentTerms) {
        if (key === "hasOwnProperty") continue;
        var value = parseInt(documentTerms[key], 10);
        totalVal += value;

        (function(key, totalVal) {
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
                    if (keysServiced === documentTermsLength) {
                        redis.get("TOTAL_KEY", function (err, res) {
                            var totalKeyDelta = 0;
                            if(res === null || isNaN(res)) {
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

                                return cb(totalKeyDelta, documentTermsLength);
                            });
                        });
                    }
                });
            });
        })(key, totalVal);
    }
}

// documentTerms: {term:count, term2:count2, ... } 
tfidf.getScoreMap = function (documentTerms, totalTermCount, cb) {
    updateBackground(documentTerms, function(backgroundTotal, documentTermsLength) {
        var score = {};

        var keysServiced = 0;

        for (var key in documentTerms) {
            (function(key) {
                var value = parseInt(documentTerms[key], 10);
                redis.get(key, function(err, res) {
                    score[key] = ((value+1)/(backgroundTotal+20000)) / totalTermCount / parseInt(res, 10);
                    keysServiced ++;
                    if (keysServiced === documentTermsLength) {
                        console.log('keysServiced == documentTermsLength');
                        return cb(score);
                    }
                });
            })(key);
        }
    });
};

exports.getScoreMap = tfidf.getScoreMap;
