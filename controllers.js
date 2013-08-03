exports.index = function (req, res) {
    var context = {
        'title': "Homepage",
    };

    res.render('index', context);
};

exports.create = function(req, res) {
    res.json(200, { url: '/our-generated-url'});
};
