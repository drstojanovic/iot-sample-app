(function () {
    'use strict';

    var HOUSE_ID = 1;
    var COLOR_UPDATE_TIMEOUT = 3000;

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

    var temperatureRef = database.ref(HOUSE_ID + '/temperature');
    temperatureRef.on('value', function (snapshot) {
        updateTemperature(snapshot.val());
    });

    var humidityRef = database.ref(HOUSE_ID + '/humidity');
    humidityRef.on('value', function (snapshot) {
        updateHumidity(snapshot.val());
    });

    var opticalRef = database.ref(HOUSE_ID + '/optical');
    opticalRef.on('value', function (snapshot) {
        updateOptical(snapshot.val());
    });

    var pressureRef = database.ref(HOUSE_ID + '/pressure');
    pressureRef.on('value', function (snapshot) {
        updatePressure(snapshot.val());
    });

    var sendMessage = function (type, value) {
        database
            .ref(HOUSE_ID + '/' + type)
            .set({
                type: type,
                value: value
            });
    };

    var updateTemperature = function (value) {
        var temperature = value.value;
        document.getElementById('temperature').textContent = temperature.toString() + ' ' + '°C';
        document.getElementById('temperature-wrapper').classList.add('animate');
        setTimeout(function () {
            document.getElementById('temperature-wrapper').classList.remove('animate');
        }, COLOR_UPDATE_TIMEOUT);
    };

    var updateHumidity = function (value) {
        var humidity = value.value;
        document.getElementById('humidity').textContent = humidity.toString() + ' %RH';
        document.getElementById('humidity-wrapper').classList.add('animate');
        setTimeout(function () {
            document.getElementById('humidity-wrapper').classList.remove('animate');
        }, COLOR_UPDATE_TIMEOUT);
    };

    var updateOptical = function (value) {
        var optical = value.value;
        document.getElementById('optical').textContent = optical.toString() + ' W/SR';
        document.getElementById('optical-wrapper').classList.add('animate');
        setTimeout(function () {
            document.getElementById('optical-wrapper').classList.remove('animate');
        }, COLOR_UPDATE_TIMEOUT);
    };

    var updatePressure = function (value) {
        var pressure = value.value;
        document.getElementById('pressure').textContent = pressure.toString() + ' HPA';
        document.getElementById('pressure-wrapper').classList.add('animate');
        setTimeout(function () {
            document.getElementById('pressure-wrapper').classList.remove('animate');
        }, COLOR_UPDATE_TIMEOUT);
    };

})();