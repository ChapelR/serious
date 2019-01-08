(function () {
    'use strict';

    var debug = Serious.debug || false;
    var emit = Serious.emit || function () {};

    function html (el, attr) {
        var $el = $(document.createElement(el))
            .addClass(attr.classes)
            .append(attr.content || '');
        delete attr.classes;
        return $el.attr(attr);
    }

    var $container = html('div', { 
        id : 'deck', 
        content : '<h1>Recent Episodes</h1>' 
    });

    // get last five episodes 
    function getRecents (data) {
        if (!data) {
            if (Serious.data) {
                data = Serious.data;
            } else {
                console.error('Could not find story data.');
            }
        }
        console.log(data);
        data.story.sort( function (a, b) {
            return Number(a.episode) - Number(b.episode);
        });
        var eps = data.story.reverse();
        console.log(eps);
        var lt = (eps.length >= 5) ? 5 : eps.length;
        var $els = [];
        for (var i = 0; i < lt; i++) {
            var ep = eps[i];
            var num = ep.episode;
            var $card = html('div', { role : 'button', title : 'Read more...', classes : 'episode-card', name : ep.title, 'data-goto' : num });
            var $title = html('h1', { classes : 'episode-title', content : num + ': ' + ep.title });
            var $desc = html('h2', { classes : 'episode-desc', content : ep.description });
            $card
                .append($title, $desc)
                .on('click', function (ev) {
                    ev.preventDefault();
                    Serious.epLink(Number($(this).attr('data-goto')));
                });

            if (i === 0) {
                function loader (data) {
                    var $capturedCard = $card;
                    emit(':render-start', data);
                    $( function () {
                        if (data.data.subtitle) {
                            $capturedCard.append(html('h2', { classes : 'episode-subtitle', content : data.data.subtitle }));
                        }
                        marked(data.content, {
                            smartypants: true
                        }, function (_, content) {
                            $capturedCard.append(html('p', { classes : 'episode-preview', content : content }));
                            emit(':render-end', data);
                        });
                    });
                }
                // attempt to load from storage, fallback to JSON
                emit(':episode-load-start', ep);
                var loadState = Serious.storage.load(ep);
                if (loadState) {
                    debug && console.log('loaded from storage', loadState);
                    emit(':episode-load-end', ep);
                    loader(loadState);
                } else {
                    $.getJSON('./content/episodes/' + ep.file, function (data) {
                        debug & console.log('loaded from file', data);
                        emit(':episode-load-end', ep);
                        loader(data);
                        Serious.storage.save(data, true);
                    });
                }
            } else {
                $card.append(html('p', { classes : 'episode-preview empty', content : '&hellip;' }));
            }
            $els.push($card);
        }
        return $els;
    }

    function createRecentsList(data) {
        return $container.append(getRecents(data));
    }

    window.Serious = window.Serious || {};
    window.Serious.recents = createRecentsList;

}());