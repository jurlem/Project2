
    
// STEP 1 create a funciton to initialize the map.
function initMap() {
  // Jahu center:
  var myLatLng = { lat: 59.4468217, lng: 24.7385231 };

  // The map, centered at jahu
  var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 12, center: myLatLng});
// The marker, positioned at Jahu
var marker = new google.maps.Marker({position: myLatLng, map: map});
}

