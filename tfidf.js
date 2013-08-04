var redis = require('redis').createClient();

// documentTerms: {term:count, term2:count2, ... } 
tfidf.getScores = function (documentTerms, totalTermCount, cb) {
    updateBackground(documentTerms, function(backgroundTotal) {
        score = {};

        var keysServied = 0;

        for (var keyIndex = 0; keyIndex < keys.legth; keyIndex++) {
            var key = keys[keyIndex];
            var value = parseInt(documentTerms[key]);
            redis.get(key, function (err, res) {
                score[key] = ((value+1)/(backgroundTotal+20000)) / totalTermCount / parseInt(res);
                keysServied ++;
                if (keysServiced === documentTerms.length) {
                    return cb(score);
                }
            });
        }
    });
}

tfidf.updateBackground = function (documentTerms, cb) {
    var totalVal = 0;
    var keysServied = 0;
    for (var key in documentTerms) {
        var value = parseInt(documentTerms[key]);
        totalVal += value;

        redis.get(key, function (err, res) {
            var delta = 0;
            if(res == null) {
                delta = value;
            } else {
                delta = parseInt(res) + value;
            }
            redis.set(key, delta, function(err, res) {
                if(err) {
                    // TODO: log error
                }
                keysServiced++;
                if (keysServiced === documentTerms.length) {
                    redis.get("TOTAL_KEY", function (err, res) {
                        var totalKeyDelta = 0;
                        if(res == null) {
                            // key does not exist. set a new key-value pair.
                            totalKeyDelta = totalVal;
                        } else {
                            // key exists. update the value.
                            totalKeyDelta = parseInt(res) + totalVal;
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

export = tfidf;
