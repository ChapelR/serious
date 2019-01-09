(function () {
    'use strict';

    var loader = function (data) {
        window.Serious.data = data;
        Serious.emit(':data-load-end', data);

        // vital info
        var title = (data.displayTitle) ? data.displayTitle : (data.title) ? data.title : "Untitled";
        var subtitle = data.subtitle || "";
        document.title = title;

        $(function () {
            var url = new Url();
            if (url.query && url.query.ep) {
                // render the appropriate episode
                window.Serious.render(Number(url.query.ep), false, data);
            } else if (url.query && url.query.meta) {
                window.Serious.render(url.query.meta.trim().toLowerCase(), true, data);
            } else {
                // render the landing page
                $('#title').empty().append(title);
                if (subtitle) {
                    $('#subtitle').empty().append(title).show();
                } else {
                    $('#subtitle').hide();
                }
                if (url.query && url.query.list) {
                    $('#content').attr('data-view', 'ream').append(Serious.list(data));
                } else {
                    $('#content').attr('data-view', 'ream').append(Serious.recents(data));
                }
            }
            if (data.story.length > 1) {
                $('#last-link').parent('li.pure-menu-item').removeClass('hide');
            }
            if (data.meta && Array.isArray(data.meta) && data.meta.length) {
                data.meta.forEach( function (meta, idx) {
                    var text = meta.link.trim();
                    $('#menu .pure-menu-list').append($(document.createElement('li'))
                        .addClass('pure-menu-item' + (idx === 0 ? ' menu-item-divided' : ''))
                        .append($(document.createElement('a'))
                            .addClass('pure-menu-link')
                            .attr('href', 'javascript:void(0)')
                            .append(text)
                            .on('click', function (ev) {
                                ev.preventDefault();
                                Serious.metaLink(meta.id);
                            })));
                });
            }
            if (data.links && Array.isArray(data.links) && data.links.length > 0) {
                // append user links
                data.links.forEach( function (link, idx) {
                    if (link.url && typeof link.url === 'string' && link.text && typeof link.text === 'string') {
                        $('#menu .pure-menu-list')
                            .append($(document.createElement('li'))
                                .addClass('pure-menu-item' + (idx === 0 ? ' menu-item-divided' : ''))
                                .append($(document.createElement('a'))
                                    .addClass('pure-menu-link')
                                    .attr({
                                        href : link.url,
                                        target : '_blank'
                                    })
                                    .append(link.text)));
                    }
                });
            }
        });
    };
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