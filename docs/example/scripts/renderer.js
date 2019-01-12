(function () {
    'use strict';

    var shouldUseStore = false;

    var debug = ($(document.body).attr('data-debug') === 'on');

    function emit (type, data) {
        $(document).trigger(Object.assign({ type : type }, data));
    }

    function getNum (n) {
        n = Number(n);
        if (Number.isNaN(n)) {
            n = -1;
        }
        return n;
    }

    function hasPrev (num, data) {
        num = getNum(num);
        return data.story.some( function (ep) {
            var target = getNum(ep.episode);
            if ((num - 1) === target) {
                return true;
            }
            return false;
        });
    }

    function hasNext (num, data) {
        num = getNum(num);
        return data.story.some( function (ep) {
            var target = getNum(ep.episode);
            if ((num + 1) === target) {
                return true;
            }
            return false;
        });
    }

    function episodeLink (num) {
        var url = new Url();
        url.clearQuery();
        url.query.ep = num;
        window.location.href = url.toString();
    }

    function metaLink (id) {
        var url = new Url();
        url.clearQuery();
        url.query.meta = id;
        window.location.href = url.toString();
    }

    function render (num, meta, data) {
        if (!data) {
            if (Serious.data) {
                data = Serious.data;
            } else {
                console.error('Could not find story data.');
            }
        }
        var episode;
        if (meta) {
            episode = data.meta.find( function (ep) {
                return ep.id === num;
            });
        } else {
            episode = data.story.find( function (ep) {
                return ep.episode === num;
            });
        }
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
                $('#title').empty().append((meta ? '' : data.data.episode + ': ') + data.data.title);
                if (data.data.subtitle) {
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
        var loadState = shouldUseStore ? Serious.storage.load(episode) : false;
        if (loadState) {
            debug && console.log('loaded from storage', loadState);
            emit(':episode-load-end', episode);
            loader(loadState);
        } else {
            $.getJSON((meta ? './content/meta/' : './content/episodes/') + episode.file, function (data) {
                debug & console.log('loaded from file', data);
                emit(':episode-load-end', episode);
                loader(data);
                shouldUseStore && Serious.storage.save(data, true);
            });
        }
        $('#content').attr('data-view', 'episode');
        $(document.body).attr('data-ep', (meta ? 'meta' : String(num)));
        if (!meta) {
            $('a.nav').hide();
            if (hasNext(num, data)) {
                $('#next').show().on('click', function (ev) {
                    episodeLink(Number(num) + 1);
                });
            }
            if (hasPrev(num, data)) {
                $('#prev').show().on('click', function (ev) {
                    episodeLink(Number(num) - 1);
                });
            }
        }
    }

    window.Serious.render = render;
    window.Serious.epLink = episodeLink;
    window.Serious.metaLink = metaLink;
    window.Serious.emit = emit;
    window.Serious.debug = debug;
}());