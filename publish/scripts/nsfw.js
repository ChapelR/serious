(function () {

    var $message = $(document.createElement('div'))
        .attr('id', 'nsfw-warning');

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
            var nsfw = ev.nsfw, age = 18, msg;
            if (nsfw) {
                if (typeof nsfw !== 'boolean') {
                    age = nsfw;
                }
                
                msg = '<p>This website contains explicit or sensitive content.</p><p>By continuing, you affirm that you are over the age of ' + age + ' and willing to see such content.</p>';
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