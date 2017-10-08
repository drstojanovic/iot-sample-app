(function() {
    'use strict';

    window.SM = window.SM || {};

    var HOUSE_ID = 1;

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDP2JldyadJMqiIW3piC4_3C5Q-LtSPTjc",
        authDomain: "iot-faks.firebaseapp.com",
        databaseURL: "https://iot-faks.firebaseio.com",
        projectId: "iot-faks",
        storageBucket: "iot-faks.appspot.com",
        messagingSenderId: "124528833807"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var commandsRef = database.ref(HOUSE_ID + '/command');

    var onValue = function(path, cb) {
        var ref = database.ref(HOUSE_ID + path);
        ref.on('value', function(snapshot) {
            cb(snapshot.val());
        });
    };

    var sendCommand = function(cmd) {
        clearTimeout(time);
        commandsRef.update(cmd);
        var time = setTimeout(function() {
            commandsRef.update({
                type: ''
            });
        }, 3 * 1000);
    };

    var sendMessage = function(type, value) {
        database
            .ref(HOUSE_ID + '/' + type)
            .set({
                type: type,
                value: value
            });
    };

    onValue('/device', function(value) {
        var online = !!value.onlineState;
        if (online) {
            $('#offlineMsg').hide();
            $('#onlineMsg').show();
        } else {
            $('#offlineMsg').show();
            $('#onlineMsg').hide();
        }
    });

    window.SM.sendMessage = sendMessage;
    window.SM.onValue = onValue;
    window.SM.sendCommand = sendCommand;
    window.SM.database = database;

})();