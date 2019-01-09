(function (){
    'use strict';

    $( function () {
        $('#first-link').on('click', function () {
            return window.Serious.epLink(1);
        });
        $('#last-link').on('click', function () {
            if (!window.Serious) {
                $(document).on(':data-loaded', function (ev) {
                    return window.Serious.epLink(ev.data.story.length);
                })
            }
            return window.Serious.epLink(window.Serious.data.story.length);
        });
    });
}());