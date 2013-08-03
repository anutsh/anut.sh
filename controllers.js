exports.index = function (req, res) {
    var context = {
        'title': "Homepage",
    };

    res.render('index', context);
};
