(function() {
    'use strict';

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

    var temperatureRef = database.ref(HOUSE_ID + '/temperature');
    temperatureRef.on('value', function(snapshot) {
        updateTemperature(snapshot.val());
    });

    var humidityRef = database.ref(HOUSE_ID + '/humidity');
    humidityRef.on('value', function(snapshot) {
        updateHumidity(snapshot.val());
    });

    var opticalRef = database.ref(HOUSE_ID + '/optical');
    opticalRef.on('value', function(snapshot) {
        updateOptical(snapshot.val());
    });

    var pressureRef = database.ref(HOUSE_ID + '/pressure');
    pressureRef.on('value', function(snapshot) {
        updatePressure(snapshot.val());
    });

    var sendMessage = function(type, value) {
        database
            .ref(HOUSE_ID + '/' + type)
            .set({
                type: type,
                value: value
            });
    };

    var updateTemperature = function(value) {
        console.log('New temperature is: ');
        console.log(value);

        var temperature = value.value;
        console.log(temperature);

        document.getElementById('temperature').textContent = temperature.toString() + ' ' + '°C';
    };

    var updateHumidity = function(value) {
        console.log('New humidity is: ');
        console.log(value);

        var humidity = value.value;
        console.log(humidity);

        document.getElementById('humidity').textContent = humidity.toString() + ' ' + value.unit;
    };

    var updateOptical = function(value) {
        console.log('New optical is: ');
        console.log(value);

        var optical = value.value;
        console.log(optical);

        document.getElementById('optical').textContent = optical.toString() + ' ' + value.unit;
    };

    var updatePressure = function(value) {
        console.log('New pressure is: ');
        console.log(value);

        var pressure = value.value;
        console.log(pressure);

        document.getElementById('pressure').textContent = pressure.toString() + ' ' + value.unit;
    };

})();