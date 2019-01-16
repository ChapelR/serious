(function (){
    'use strict';

    $( function () {
        $('#first-link').on('click', function () {
            return Serious.epLink(1);
        });
        $('#last-link').on('click', function () {
            if (!window.Serious || !window.Serious.data) {
                $(document).on(':data-loaded', function (ev) {
                    return Serious.epLink(ev.data.story.length);
                });
            }
            return Serious.epLink(Serious.data.story.length);
        });
    });
}());