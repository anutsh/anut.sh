$(function() {
    var $convertButton = $('#convert');
    var $inputUrl = $('#inputUrl');

    $inputUrl.keypress(function() {
        console.log('inputUrl.text = ' + $inputUrl.val());
    });

});
