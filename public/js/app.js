$(function () {
    var $convertButton = $('#submit');
    var $inputUrl = $('#url');

    var options = {
        delay: 350,
    };

    function onShortUrlSuccess(data) {
        console.log('data = ' + JSON.stringify(data));
        return;
    }

    function onShortUrlError(jqXHR) {
    }

    // Eventually this will be a 'loading' spinner or
    // something
    var loading = {
        target: document.getElementById('spinner'),
        spinOpts:  {
            lines: 13,
            length: 20,
            width: 10,
            radius: 30,
            corners: 1,
        },
        done: function() {
            loading.spinner.stop();
            $inputUrl.attr('disabled', false);
        },
        start: function() {
            loading.spinner = new Spinner(loading.spinOpts);
            loading.spinner.spin(loading.target);
            $inputUrl.attr('disabled', true);
        }
    };

    function ajax(success, error) {
        var successCallbacks = [loading.done];
        var errorCallbacks = [loading.done];

        if (success) { successCallbacks.push(success); }
        if (error) { errorCallbacks.push(error); }

        loading.start();

        $.ajax({
            url: '/',
            type: 'post',
            data: {
                url: $inputUrl.val()
            },
            success: successCallbacks,
            error: errorCallbacks
        });
    }

    function handleUrlChange() {
        console.log('Url change!');
        ajax(onShortUrlSuccess, onShortUrlError);
    }

    // **** DOM element event handlers ***
    $inputUrl.search({
        search: handleUrlChange,
        delay: options.delay,
    });
});
