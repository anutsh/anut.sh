var controllers = require('./controllers');

var routes = [
    {
        url: '/',
        handler: controllers.index,
        method: 'get',
    },
];

// Dynamically setups the routing for each route
exports.setup = function (app) {
    routes.forEach(function (route) {
        (app[route.method])(route.url, route.handler);
    });
};
