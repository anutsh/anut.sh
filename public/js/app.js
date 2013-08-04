$(function () {
    var $btn = $('#convert'),
        $tmpl = $('#template'),
        $url = $('#url'),
        $links = $('.links'),
        $ul = $('.links ul'),
        $tag = $('#tag'),
        $status = $('#status'),
        $nut = $('.logo .nut'),
        links = 0;

    var options = {
        host: 'http://anut.sh/',
        taglineChange: 5,
        nutShake: 7,
        nutAnimation: 5,
        submit: '/',
        delay: 350,
    };

    // Eventually this will be a 'loading' spinner or
    // something
    var loading = {
        target: document.getElementById('spinner'),
        spinOpts:  {
            lines: 13,
            length: 8,
            width: 3,
            radius: 5,
            corners: 1,
        },
        done: function () {
            if (loading.spinner) {
                loading.spinner.stop();
            }

            $url.attr('disabled', false);
        },
        start: function () {
            loading.spinner = new Spinner(loading.spinOpts);
            loading.spinner.spin(loading.target);
            $url.attr('disabled', true);
        },
    }, ui = {
        results: function (url) {
            var $this = $(this),
                $clone = $tmpl.clone().attr('id', ''),
                $button = $clone.find('button'),
                $input = $clone.find('input');

            console.log('Submit button pressed');

            if (links === 0) {
                $status.text(nutshell.ask(links));
            } else {
                $status.fadeOut(400, function () {
                    $status.text(nutshell.ask(links));
                    $status.fadeIn(400);
                });
            }

            $links.removeClass('hide');
            $ul.prepend($clone);

            $input.attr('id', 'link' + links);
            $input.val(options.host + url);
            $input.focus().select();
            $button.data('clipboard-target', 'link' + links);

            new ZeroClipboard($button[0], {
                moviePath: "/lib/zeroclipboard/ZeroClipboard.swf"
            });

            links += 1;
        }
    }, submit = {
        press: function () {
            var url = $url.val();
            if (!url.match(/^[a-zA-Z]+:\/\//))
                url = 'http://' + url;

            if (!isUrl(url)) {
                $status.text(nutshell.error());
                return;
            }

            loading.start();

            $.ajax({
                url: options.submit,
                type: 'post',
                dataType: 'json',
                data: {
                    url: $url.val(),
                },
                success: submit.success,
                error: submit.error,
            });
        },
        success: function (data) {
            ui.results(data.url);
            loading.done();
        },
        error: function (data) {
            console.log('error in submit');
            loading.done();
        },
    }, silent = {
        search: function () {
            var url = $url.val();

            if (!isUrl(url)) {
                $status.text(nutshell.error());
                return;
            }

            console.log('Silent search called');
            silent.finished = undefined;

            $btn.unbind();
            $btn.click(silent.press);

            $.ajax({
                url: options.submit,
                type: 'post',
                dataType: 'json',
                data: {
                    url: $url.val(),
                },
                success: silent.success,
                error: silent.error,
            });
        },
        press: function (event) {
            var url = $url.val();

            if (!isUrl(url)) {
                $status.text(nutshell.error());
                return;
            }

            console.log('intercepted button');
            if (silent.finished) {
                ui.results(silent.finished.url);
            } else {
                loading.start();
            }

            // Do regardless
            $btn.unbind();
            $btn.click(submit.press);
        },
        success: function (data) {
            silent.finished = data;
            loading.done();
        },
        error: function (data) {
            console.log('silent error');
        },
    }, tagline = function () {
        $tag.fadeOut(400, function () {
            $tag.text(nutshell.tag());
            $tag.fadeIn(400);
        });
    }, isUrl = function (url) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    	return regexp.test(url);
	}, shakeNuts = function () {
        $nut.addClass('animated');

        var timeout = setTimeout(function () {
            clearTimeout(timeout);
        }, options.nutAnimation);
    };

    //
    // Attach Event Handlers
    //

    $url.search({
        search: silent.search,
        delay: options.delay,
    });

    $btn.click(submit.press);

    //
    // Setup Timeouts
    //

    setTimeout(tagline, options.taglineChange * 1000);
    setTimeout(shakeNuts, options.nutShake * 1000);

    //
    // Setup Copy & Paste
    //

    $url.focus();
});
