(function () {

    var $message = $(document.createElement('div'))
        .attr('id', 'nsfw-warning')

    var $confirm = $(document.createElement('a'))
        .attr('id', 'nsfw-confirm')
        .append('Continue');

    var $overlay = $(document.createElement('div'))
        .attr('id', 'overlay')
        .append($message, $confirm);

    function confirmNSFW () {
        if (!window.localStorage) {
            return;
        }
        localStorage.setItem('nsfw', 'ok');
    }

    function checkNSFW () {
        if (!window.localStorage) {
            return false;
        }
        return localStorage.getItem('nsfw') === 'ok';
    }

    $(document).on(':data-load-end', function (ev) {
        if (checkNSFW()) {
            return;
        }
        $(function () {
            var nsfw = ev.nsfw, msg;
            if (nsfw && typeof nsfw !== 'boolean') {
                msg = '<p>This website contains sexually explicit content.</p><p>By continuing, you affirm that you are over the age of ' + nsfw + ' and willing to see such content.</p>';
            } else if (nswf) {
                msg = '<p>This website contains sexually explicit content.</p><p>By continuing, you affirm that you are over the age of 18 and willing to see such content.</p>';
            }
            if (msg) {
                $message.append(msg);
                $(document.body).append($overlay);
                $confirm.on('click', function () {
                    confirmNSFW();
                    $overlay.fadeOut(250, function () {
                        $overlay.remove();
                    });
                });
            }
        });
    });
}());