(function () {
    'use strict';

    function render (num, data) {
        var episode = data.story[num - 1];
        console.log(episode);
        if (!episode) {
            $('#title').empty().append('404');
            $('#subtitle').empty().append('Not found.').show();
            return;
        }
        $.getJSON('./content/episodes/' + episode.file, function (data) {
            $('#title').empty().append(data.data.episode + ': ' + data.data.title);
            if (episode.subtitle) {
                $('#subtitle').empty().append(data.data.subtitle).show();
            } else {
                $('#subtitle').hide();
            }
            $('#content').empty().append(marked(data.content, {
                smartypants: true
            }));
        });
        $('#content').attr('data-view', 'episode');
        $(document.body).attr('data-ep', String(num));
    }

    function episodeLink (num) {
        var url = new Url;
        url.query.ep = num;
        window.location.href = url.toString();
    }

    window.render = render;
    window.epLink = episodeLink;
}());