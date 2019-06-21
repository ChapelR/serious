(function (){
    'use strict';

    window.Serious = window.Serious || {};
}());

/*
(function (){
    'use strict';

    window.Serious = window.Serious || {};
    window.Serious.storageKey = '%%serious';

    var defaultRefetch = {
        main : 7200000, // 2 hours
        perEpisode : 86400000 // 24 hours
    }; // milliseconds before a refetch

    function save (data, ep) {
        try {
            if (!window.localStorage) {
                console.log('Cannot access local storage!');
                return;
            }
            Object.assign(data, { timestamp : Date.now() });
            // load episode data
            var key = Serious.storageKey + ((ep) ? ('-' + data.data.filename) : '');
            window.localStorage.setItem(key, JSON.stringify(data));
        } catch (err) {
            console.error(err.message);
        }
    }

    function load (ep) {
        // returns null if the data should be fetched anyway
        try {
            // if in debug mode, load the data
            if (Serious.data && Serious.data.debug) {
                return null;
            }
            // local storage is inaccessible
            if (!window.localStorage) {
                console.log('Cannot access local storage!');
                return null;
            }
            // load 
            var key = Serious.storageKey + ((ep) ? ('-' + ep.file) : '');
            var ret = JSON.parse(window.localStorage.getItem(key));
            // check data
            if (!ret) {
                return null;
            }
            // check timestamp
            if (!ret.timestamp) {
                return null; // can't know how old it is
            }
            var type = (ep) ? 'perEpisode' : 'main';
            var refetch = (Serious.refetch && Serious.refetch[type] && 
                typeof Serious.refetch[type] === 'number' && 
                Serious.refetch[type] > 0) ? 
                Serious.refetch[type] : defaultRefetch[type];
            if ((Date.now() - ret.timestamp) > refetch) {
                return null;
            }
            // if that's all good, return
            delete ret.timestamp; // clear the stamp
            return ret;
        } catch (err) {
            console.error(err.message);
            return null;
        }
    }

    window.Serious.storage = {
        save : save,
        load : load
    };
}());
*/