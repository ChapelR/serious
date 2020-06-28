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
                // render the appropriate meta post
                window.Serious.render(url.query.meta.trim().toLowerCase(), true, data);
            } else {
                // render the landing page
                $('#title').empty().append(title);
                if (subtitle) {
                    $('#subtitle').empty().append(subtitle).show();
                } else {
                    $('#subtitle').hide();
                }
                if (url.query && url.query.list) {
                    $('#content').attr('data-view', 'ream').append(Serious.list(data));
                } else {
                    $('#content').attr('data-view', 'ream').append(Serious.recents(data));
                }
            }
            if (data.copyright && typeof data.copyright === 'string' && data.copyright.trim()) {
                $('#user-copyright').empty().append(data.copyright, '<br />');
            }
            if (data.story.length > 1) {
                $('#last-link').parent('li.pure-menu-item').removeClass('hide');
            }
            if (data.meta && Array.isArray(data.meta) && data.meta.length) {
                data.meta.forEach( function (meta, idx) {
                    var text = meta.link.trim();
                    if (text === '_') {
                        return;
                    }
                    $('#menu .pure-menu-list').append($(document.createElement('li'))
                        .addClass('pure-menu-item' + (idx === 0 ? ' menu-item-divided' : ''))
                        .append($(document.createElement('a'))
                            .addClass('pure-menu-link')
                            .attr({
                                href : '#',
                                title : meta.label || ''
                            })
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
                                        target : '_blank',
                                        title : link.label || ''
                                    })
                                    .append(link.text)));
                    }
                });
            }
            // disqus support
            if (data.disqusShortname && typeof data.disqusShortname === 'string' && data.disqusShortname.trim() &&
                $(document.body).attr('data-ep') !== 'meta' && $(document.body).attr('data-ep') !== '0') {
                var slugTitle = $('#title')
                    .text()
                    .trim()
                    .toLowerCase()
                    .replace(/[^A-Za-z0-9]*/, '-');

                var disqus_config = function () {
                    this.page.url = new Url().toString();  // Replace PAGE_URL with your page's canonical URL variable
                    this.page.identifier = $(document.body).attr('data-ep') + '-' + slugTitle; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                };

                (function() { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://' + data.disqusShortname.trim() + '.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                })();

                $('#disqus_thread').removeClass('hide');
            }
        });
    };
    // attempt to load from storage, fallback to JSON
    Serious.emit(':data-load-start');
    /*
    var loadState = Serious.storage.load();
    if (loadState) {
        Serious.debug && console.log('loaded from storage', loadState);
        loader(loadState);
    } else {
    */

    $.getJSON('./content/index.json', function (data) {
        if (Serious.debug) {
            console.log('loaded from file', data);
        }
        loader(data);
        // save the load state
        // Serious.storage.save(data);
    });

    /*
    }
    */
}());