(function () {
    'use strict';
    var debug = ($(document.body).attr('data-debug') === 'on')

    $.getJSON('./content/index.json', function (data) {
        $(document).trigger({
            type : 'data-loaded',
            data : data
        });
        debug && console.log(data);
    });
}());