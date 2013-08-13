(function ($) {
    'use strict';

    var handler = {
        init: function (options) {
            return this.each(function () {
                var
                $this = $(this),
                settings = $.extend({
                    delay: 200,
                    search: function () {}
                }, options);

                handler.settings = settings;
                $(this).keyup(handler.process)
            });
        },
        previous: '',
        resetTimer: function (timer) {
            if (timer) clearInterval(timer);
        },
        process: function () {
            var $input = $(this),
                val = $input.val() || '';

            if (handler.previous !== val) {
                var diff = Math.abs(handler.previous.length - val.length);
                handler.resetTimer(handler.timer);

                if (diff === 1) {
                    // Single keypress
                    handler.timer = setTimeout(handler.settings.search, handler.settings.delay);
                    handler.previous = $input.val();
                } else if (diff >= 1) {
                    // Possibly a copy and paste
                    handler.settings.search();
                    handler.previous = $input.val();
                }
            }
        }
    };

    $.fn.search = function (method) {
        if (handler[method]) {
            return handler[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return handler.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.search');
        }
    };
}($));
