(function() {
    'use strict';

    var COLOR_UPDATE_TIMEOUT = 3000;

    var updateTemperature = function(value) {
        var temperature = value.value;
        document.getElementById('temperature').textContent = temperature.toString() + ' ' + '°C';
        document.getElementById('temperature-wrapper').classList.add('animate');
        setTimeout(function() {
            document.getElementById('temperature-wrapper').classList.remove('animate');
        }, COLOR_UPDATE_TIMEOUT);
    };

    var updateHumidity = function(value) {
        var humidity = value.value;
        document.getElementById('humidity').textContent = humidity.toString() + ' %RH';
        document.getElementById('humidity-wrapper').classList.add('animate');
        setTimeout(function() {
            document.getElementById('humidity-wrapper').classList.remove('animate');
        }, COLOR_UPDATE_TIMEOUT);
    };

    var updateOptical = function(value) {
        var optical = value.value;
        document.getElementById('optical').textContent = optical.toString() + ' W/SR';
        document.getElementById('optical-wrapper').classList.add('animate');
        setTimeout(function() {
            document.getElementById('optical-wrapper').classList.remove('animate');
        }, COLOR_UPDATE_TIMEOUT);
    };

    var updatePressure = function(value) {
        var pressure = value.value;
        document.getElementById('pressure').textContent = pressure.toString() + ' HPA';
        document.getElementById('pressure-wrapper').classList.add('animate');
        setTimeout(function() {
            document.getElementById('pressure-wrapper').classList.remove('animate');
        }, COLOR_UPDATE_TIMEOUT);
    };

    window.SM.onValue('/temperature', updateTemperature);
    window.SM.onValue('/humidity', updateHumidity);
    window.SM.onValue('/optical', updateOptical);
    window.SM.onValue('/pressure', updatePressure);

    $('#startReading').click(function () {
        //start_reading 
        window.SM.sendCommand({
            type: 'start_reading'
        });
    });

})();