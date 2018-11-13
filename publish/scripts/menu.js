(function (){
    'use strict';

    $( function () {
        $('#first-link').on('click', function () {
            return epLink(1);
        });
        $('#last-link').on('click', function () {
            if (!window.Serious) {
                $(document).on(':data-loaded', function (ev) {
                    return epLink(ev.data.story.length);
                })
            }
            return epLink(window.Serious.story.length);
        });
        $('#blog-link').on('click', function () {
            if (!window.Serious) {
                $(document).on(':data-loaded', function (ev) {
                    return window.open(ev.data.blog);
                })
            }
            return window.open(window.Serious.blog);
        });
        $('#about-link').on('click', function () {
            if (!window.Serious) {
                $(document).on(':data-loaded', function (ev) {
                    return window.open(ev.data.about);
                })
            }
            return window.open(window.Serious.about);
        });
    });
}());