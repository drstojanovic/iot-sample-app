(function() {
    'use strict';

    var updateDevices = function(devices) {
        console.log(devices);
        var $listOfDevices = $('#listOfDevices');
        $listOfDevices.html('');

        if (!devices || !devices.length) {
            return;
        }

        for (var i = 0; i < devices.length; i++) {
            var $el = $('<div class="item" data-id="' + devices[i].id + '">' +
                '<div class="content">' +
                '    <div class="header">' + devices[i].name + '</div>' +
                '    <span>' + devices[i].protocol + '</span>' +
                '</div>' +
                '</div>');

            console.log($el);

            $listOfDevices.append($el);
        }
    };

    window.SM.onValue('/devices', function(value) {
        if (!value) {
            value = {};
        }
        updateDevices(value.devices);
    });

    $(document).ready(function() {
        $('#discoveryOn').click(function() {
            window.SM.sendCommand({
                type: 'discovery_on'
            });
        });
        $('#discoveryOff').click(function() {
            window.SM.sendCommand({
                type: 'discovery_off'
            });
        });

        $('#listOfDevices').on('click', '.item', function() {
            window.SM.sendCommand({
                type: 'register_device',
                id: $(this).data('id'),
                deviceType: 'TI SensorTag'
            });
        });
    });
})();