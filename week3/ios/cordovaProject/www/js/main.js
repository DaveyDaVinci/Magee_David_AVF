/*
window.addEventListener("DOMContentLoaded", function(){

//This is the getelementbyid function.  use the $ symbol to run the function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	};
	
	
	//Necessary for Android video
	var video = $("movie");
  	video.onclick = function() {
    	if (video.paused) {
     		video.play();
    	} else {
      		video.pause();
    	}
  	};
  	
  	
  }*/

/*
http://search.twitter.com/search.json?q=sci%20fi&rpp=10&include_entities=true$result_type=recent
*/




//Geolocation

//Listens for phonegap to load  
function onBodyLoad(){		
	document.addEventListener("deviceready", onDeviceReady, false);
}

//creates the string
function onDeviceReady(){
    phoneGapReady.innerHTML = ("")	
}

//shortcut for text
var x=document.getElementById("geolocationDemo");

//Looks for navigator to load, if not throws an error
function getLocation(){
    
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
    	x.innerHTML="Unable to Find Location";
    }
}

//Locates position and spits it out as a string
function showPosition(position){
    var element = document.getElementById('geolocationDemo');
        element.display="block";
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + new Date(position.timestamp)          + '<br />';
}

//Error indicators
function showError(error){
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}






//Camera page
//Runs when camera page is loaded
function onCamLoad(){		
    document.addEventListener("deviceready", onCameraReady, false);
}

//gets into phonegap's libraries to set source and destination
function onCameraReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}


function onPhotoDataSuccess(imageData) {
      // Grabs the image tag from html
      var smallImage = document.getElementById('smallImage');

      // unhides image
      smallImage.style.display = 'block';

      // Show the captured photo
      smallImage.src = "data:image/jpeg;base64," + imageData;
}

    //Runs when a picture is taken
function onPhotoURISuccess(imageURI) {
      // grabs image tag from html
	var largeImage = document.getElementById('largeImage');

      // Unhide image elements
    largeImage.style.display = 'block';

      // Show the captured photo
    largeImage.src = imageURI;
}

   //takes picture
function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 45 });
}

    //Takes editable picture
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
}

  //grabs photo from specific source
function getPhoto(source) {
      // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 45, 
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

    //Errors
function onFail(message) {
    alert('Failed because: ' + message);
}
  
  
 
 
//Compass page 
function onCompLoad(){		
    document.addEventListener("deviceready", onCompassReady, false);
}  
// for the heading
var watchID = null;


//Starts watching for direction when loaded
function onCompassReady() {
    startWatch();
}

// Start watching the compass
function startWatch() {
	// Update compass every 100 ms
    var options = { frequency: 3000 };
	watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

// Stop watching the compass
function stopWatch() {
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
}

//Get the current heading
function onSuccess(heading) {
    var element = document.getElementById('heading');
    element.innerHTML = 'Heading: ' + heading;
}


//Fail
function onError() {
    alert('onError!');
}





//Network COnnectivity
function onNetLoad(){		
	document.addEventListener("deviceready", false);
}

//Calls checking function
function onNetReady() {
    checkConnection();
}

function checkConnection() {
    var networkState = navigator.network.connection.type;
	var element = document.getElementById('connectionText');
	
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    element.innerHTML = 'Network Connection: ' + states[networkState];
}





//Device Info
function deviceInfo() {
        var element = document.getElementById('deviceProperties');
        element.display="block";

        element.innerHTML = 'Device Name: '     + device.name     + '<br />' +  
                            'Device Platform: ' + device.platform + '<br />' + 
                            'Device Version: '  + device.version  + '<br />';
}

$(function() { 
	$.getJSON("http://search.twitter.com/search.json?q=sci%20fi&rpp=10&include_entities=true&result_type=recent&callback=?",
		function(data) {
		alert("hi");
		$("twitterfeed").html("<p>Info Fetched</p>");
		for (i=0, j=data.results.length; i<j; i++) {
			$("twitter").append("<img src='" + data.results[i].profile_image_url + "' />");
		}	
	});
});


/*

$('#jsondata').on('click', function(){
			
			$.ajax({
				url: 'http://search.twitter.com/search.json?q=sci%20fi&rpp=10&include_entities=true&result_type=recent&callback=?',
				type: 'GET',
				dataType: 'json',
				success: function(data){
					for (var i=0, j=data.results.length; i<j; i++){
						$(
							'<li>'+ "<img src='" + data.results[i].profile_image_url + "' />"
								 +
							'</li>'
						).appendTo('#twitter');
						console.log(answer);
					}
				}
			});
			return false;
	});
	
	*/




	