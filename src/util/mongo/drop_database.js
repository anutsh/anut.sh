var mongoose = require('mongoose');
var express = require('express');

var config = require('../../config');
var models = require('../../models');

var app = express();
app.config = config[app.settings.env];
var db = mongoose.connect(app.config.db.uri, function() {
    console.log('About to drop database at ' + app.config.db.uri + '... (6 second timeout)');
    setTimeout(function() {
        mongoose.connection.db.dropDatabase(function(err) {
            if (err) {
                console.log('error: ' + err);
            }
            console.log('OK');
            mongoose.connection.close();
        });
    }, 6000);
});
