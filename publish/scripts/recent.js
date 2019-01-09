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
    function getList (data, recents) {
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
        if (recents) {
            var eps = data.story.reverse();
            var lt = (eps.length >= data.recentMax) ? data.recentMax : eps.length;
        } else {
            var eps = data.story;
            var lt = eps.length;
        }
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

            if (i < (recents ? data.recentsExcerpts : data.episodesExcerpts)) {
                function loader (data, $capturedCard) {
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
                // we're creating a block scope here to capture the current $card
                try { throw $card; }
                catch($capturedCard) {
                    // attempt to load from storage, fallback to JSON
                    emit(':episode-load-start', ep);
                    var loadState = Serious.storage.load(ep);
                    if (loadState) {
                        debug && console.log('loaded from storage', loadState);
                        emit(':episode-load-end', ep);
                        loader(loadState, $capturedCard);
                    } else {
                        $.getJSON('./content/episodes/' + ep.file, function (data) {
                            debug & console.log('loaded from file', data);
                            emit(':episode-load-end', ep);
                            loader(data, $capturedCard);
                            Serious.storage.save(data, true);
                        });
                    }
                    $els.push($capturedCard);
                }
            } else {
                $card.append(html('p', { classes : 'episode-preview empty', content : '&hellip;' }));
            }
            $els.push($card);
        }
        return $els;
    }

    function createRecentsList (data) {
        return $container.append(getList(data, true));
    }

    function createEpisodeList (data) {
        return $container.empty().append('<h1>Episode List</h1>', getList(data));
    }

    window.Serious = window.Serious || {};
    window.Serious.recents = createRecentsList;
    window.Serious.list = createEpisodeList;

}());