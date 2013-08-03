$(function() {
    var $convertButton = $('#convert');
    var $inputUrl = $('#inputURL');

    function onShortUrlSuccess(data) {
        console.log('data = ' + JSON.stringify(data));
        return;
    }

    function onShortUrlError(jqXHR) {
    }

    function ajax(success, error) {
        var successCallbacks = [];
        var errorCallbacks = [];
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

    $inputUrl.on('paste', function() {
        // need a small timeout to let input 
        // element catch up
        setTimeout(handleUrlChange, 100);
    });

    $inputUrl.on('keypress', handleUrlChange);

});
