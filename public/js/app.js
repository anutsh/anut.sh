$(function() {
    var $convertButton = $('#convert');
    var $inputUrl = $('#inputURL');

    function onShortUrlSuccess(data) {
        console.log('data = ' + JSON.stringify(data));
        return;
    }

    function onShortUrlError(jqXHR) {
    }

    // Eventually this will be a 'loading' spinner or 
    // something
    var loading = {
        done: function() {
            $inputUrl.attr('disabled', false);
        },
        start: function() {
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
            },
            success: successCallbacks,
            error: errorCallbacks
        });
    }

    function handleUrlChange() {
        console.log('inputUrl.text = ' + $inputUrl.val());
        ajax(onShortUrlSuccess, onShortUrlError);
    }

    // DOM element event handlers
    $inputUrl.on('paste', function() {
        // need a small timeout to let input 
        // element catch up
        setTimeout(handleUrlChange, 100);
    });
    $inputUrl.on('keypress', handleUrlChange);

});
