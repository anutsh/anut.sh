exports.index = function (req, res) {
    var context = {
        'title': "Homepage",
    };

    res.render('index', context);
};

exports.submit = function (req, res) {
    var url = "http://google.com";
    var message = "success";

    res.json(200,{
        'message': message,
        'url': url,

    });
};
