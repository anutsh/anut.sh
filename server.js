//
// Server.js
//

var cons = require('consolidate'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    swig = require('swig'),
    // Local imports
    routes = require('./routes'),
    models = require('./models'),
    filters = require('./filters');

var db = mongoose.connect('mongodb://localhost/anutsh');
var app = express();

app.configure(function (){
    //
    // Various Settings
    //

    app.set('views', __dirname + '/templates');
    app.set('port', process.env.PORT || 4000);
    app.set('host', process.env.IP || '0.0.0.0');

    //
    // Config
    //

    // Use Swig for templates
    app.engine('.html', cons.swig);
    app.set('view engine', 'html');

    // Setup Swig
    swig.init({
        root: __dirname + '/templates',
        allowErrors: true,
        filters: filters,
    });

    //
    // Middleware (built-in)
    //

    // Setup Favicon
    app.use(express.favicon('public/favicon.ico'));

    // Setup Logger
    app.use(express.logger('dev'));

    // Setup bodyParser (multipart data, encoded, json)
    app.use(express.bodyParser());

    // I don't know what this does.
    app.use(express.methodOverride());

    // Server up static data
    app.use(express.static(path.join(__dirname, 'public/')));

    app.use(app.router);
});

//
// Development Mode
//

app.configure('development', function (){
    app.use(express.errorHandler());
});

//
// Setup Database and Models
//
models.setup(db);

//
// Setup Routing
//

routes.setup(app, db);

//
// Launch Server
//

http.createServer(app).listen(app.get('port'), app.get('host'), function(){
    console.log('The sleeper has awakened.');
    console.log('Running: ' + app.get('host') + ':' + app.get('port'));
});
