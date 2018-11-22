(function (){
    'use strict';

    function handle (event, cb) {
        if (! cb || typeof cb !== 'function') {
            return; // bail
        }
        $(document).on(event, function (ev) {
            return cb(ev);
        });
    }

    window.Serious.on = {
        startup : function (cb) {
            handle('ready', cb);
        },
        data : {
            start : function (cb) {
                handle(':data-load-start', cb);
            },
            loaded : function (cb) {
                handle(':data-load-end', cb);
            }
        },
        episode : {
            start : function (cb) {
                handle(':episode-load-start', cb);
            },
            loaded : function (cb) {
                handle(':episode-load-end', cb);
            }
        },
        render : {
            start : function (cb) {
                handle(':render-start', cb);
            },
            finish : function (cb) {
                handle(':render-end', cb);
            }
        }
    };

    Serious.on.episode.loaded( function () {
        $(document).ready(function () {
            $('#overlay').addClass('hide');
        });
    });
    Serious.on.data.loaded( function () {
        $(document).ready(function () {
            $('#overlay').addClass('hide');
        });
    });
    
}());