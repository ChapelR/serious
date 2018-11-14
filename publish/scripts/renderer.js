(function () {
    'use strict';

    var debug = ($(document.body).attr('data-debug') === 'on');

    function emit (type, data) {
        $(document).trigger(Object.assign({ type : type }, data));
    }

    function render (num, data) {
        if (!data) {
            if (Serious.data) {
                data = Serious.data;
            } else {
                console.error('Could not find story data.');
            }
        }
        var episode = data.story[num - 1];
        if (!episode) {
            emit(':render-start', { title : '404', content : null });
            $('#title').empty().append('404');
            $('#subtitle').empty().append('Not found.').show();
            emit(':render-end', { title : '404', content : null });
            return;
        }

        function loader (data) {
            emit(':render-start', data);
            $( function () {
                $('#title').empty().append(data.data.episode + ': ' + data.data.title);
                if (episode.subtitle) {
                    $('#subtitle').empty().append(data.data.subtitle).show();
                } else {
                    $('#subtitle').hide();
                }
                marked(data.content, {
                    smartypants: true
                }, function (_, content) {
                    $('#content').empty().append(content);
                    emit(':render-end', data);
                });
            });
        }
        // attempt to load from storage, fallback to JSON
        emit(':episode-load-start', episode);
        var loadState = Serious.storage.load(episode);
        if (loadState) {
            debug && console.log('loaded from storage', loadState);
            emit(':episode-load-end', episode);
            loader(loadState);
        } else {
            $.getJSON('./content/episodes/' + episode.file, function (data) {
                debug & console.log('loaded from file', data);
                emit(':episode-load-end', episode);
                loader(data);
                Serious.storage.save(data, true);
            });
        }
        $('#content').attr('data-view', 'episode');
        $(document.body).attr('data-ep', String(num));
    }

    function episodeLink (num) {
        var url = new Url;
        url.query.ep = num;
        window.location.href = url.toString();
    }

    window.Serious.render = render;
    window.Serious.epLink = episodeLink;
    window.Serious.emit = emit;
    window.Serious.debug = debug;
}());