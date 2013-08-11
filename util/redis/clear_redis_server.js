var redis = require('redis').createClient();
redis.flushall(function(err, res) {
    console.log(res);
    return redis.end();
});
