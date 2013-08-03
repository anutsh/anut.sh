$(function() {
    var $convertButton = $('#convert');
    var $inputUrl = $('#inputUrl');

    $inputUrl.change(function() {
        console.log('inputUrl.text = ' + $inputUrl.value());
    });

    // Event handlers for DOM elements
    $convertButton.click(function() {
        $.ajax({
            url: '/',
            type: 'post',
            responseType: 'json',
            data: {
                url: ''
            }
        });
    });

});
