(function () {
    'use strict';

    function loader (data) {
        window.Serious.data = data;
        Serious.emit(':data-load-end', data);

        // vital info
        var title = (data.title) ? data.title : "Untitled";
        var subtitle = data.subtitle || "";
        document.title = data.title;

        $(function () {
            var url = new Url;
            if (url.query && url.query.ep) {
                // render the appropriate episode
                window.Serious.render(Number(url.query.ep), data);
            } else {
                // render the landing page
                $('#title').empty().append(title);
                if (subtitle) {
                    $('#subtitle').empty().append(title).show();
                } else {
                    $('#subtitle').hide();
                }
                $('#content').attr('data-view', 'ream').append(Serious.recents(data));
            }
            if (data.story.length > 1) {
                $('#last-link').parent('li.pure-menu-item').removeClass('hide');
            }
            if (data.blog) {
                $('#blog-link').parent('li.pure-menu-item').removeClass('hide');
            }
            if (data.about) {
                $('#about-link').parent('li.pure-menu-item').removeClass('hide');
            }
        });
    }
    // attempt to load from storage, fallback to JSON
    Serious.emit(':data-load-start');
    var loadState = Serious.storage.load();
    if (loadState) {
        Serious.debug && console.log('loaded from storage', loadState);
        loader(loadState);
    } else {
        $.getJSON('./content/index.json', function (data) {
            Serious.debug && console.log('loaded from file', data);
            loader(data);
            // save the load state
            Serious.storage.save(data);
        });
    }
}());