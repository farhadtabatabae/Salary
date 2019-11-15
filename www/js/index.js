var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.testZone = {};
        this.watchID = null;
    },

    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        console.log("Ready");
        app.testZone = document.getElementById("test-zone");
        app.startAccelWatch();
        app.testZone.addEventListener("click", app.testOrientation, false);
    },
    
    testOrientation: function(evt) {
    	//app.testZone.removeEventListener("click", app.testOrientation, false);
    	//app.stopAccelWatch();
    	window.addEventListener("orientationchange", app.onOrientationChange, false);
    },
    
    onOrientationChange: function() {
    	app.testZone.innerHTML += "<br />"+window.orientation;
    },
    
    startAccelWatch: function() {
    	var options = { frequency: 100 };
        app.watchID = navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);
    },
    
    stopAccelWatch: function() {
        if (app.watchID) {
            navigator.accelerometer.clearWatch(app.watchID);
            app.watchID = null;
            app.testZone.innerHTML = "";
        }
    },

    onSuccess: function(acceleration) {
        app.testZone.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                            'Acceleration Y: ' + acceleration.y + '<br />' +
                            'Acceleration Z: ' + acceleration.z + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
                            
        var marginLeft = -acceleration.x*20 - 25;
        var marginTop = acceleration.y*20 - 25;
        app.testZone.innerHTML = '<div class="block" style="margin-left: '+marginLeft+'px; margin-top:'+marginTop+'px"></div>';
    },

    onError: function() {
        app.testZone.innerHTML = "Acceleration Error!";
    }
};
