$(function() {
    var $convertButton = $('#convert');
    var $inputUrl = $('#inputUrl');

    function handleUrlChange() {
        console.log('inputUrl.text = ' + $inputUrl.val());
    }

    $inputUrl.on('paste', function() {
        // need a small timeout to let input 
        // element catch up
        setTimeout(handleUrlChange, 100);
    });

    $inputUrl.on('keypress', handleUrlChange);

});
