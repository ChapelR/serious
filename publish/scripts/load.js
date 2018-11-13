(function () {
    'use strict';
    var debug = ($(document.body).attr('data-debug') === 'on')

    $.getJSON('./content/index.json', function (data) {
        window.Serious = data;
        $(document).trigger({
            type : ':data-loaded',
            data : data
        });
        debug && console.log(data);
        var title = (data.title) ? data.title : "Untitled";
        var subtitle = data.subtitle || "";
        document.title = data.title;
        $(function () {
            var url = new Url;
            if (url.query && url.query.ep) {
                // render the appropriate episode
                render(Number(url.query.ep), data);
            } else {
                // render the landing page
                $('#title').empty().append(title);
                if (subtitle) {
                    $('#subtitle').empty().append(title).show();
                } else {
                    $('#subtitle').hide();
                }
                $('#content').attr('data-view', 'ream');
            }
            if (data.story.length === 1) {
                $('#last-link').remove();
            }
            if (!data.blog) {
                $('#blog-link').remove();
            }
            if (!data.about) {
                $('#about-link').remove();
            }
        });
    });
}());