/**
 * Created by JeongHwi on 2014-05-28.
 */
var map;
var feedData;
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(36.397, 150.644)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);


xively.setKey("iQVFd0Oi8lPmR9fJvTR3ywwzr1UATggRw9XMZdFRR9vOjIEj");

xively.feed.get("1340702799");
var PARSEDresponse = JSON.parse(JSONresponse);
console.log(PARSEDresponse);
xively.setKey("QuHWV9Uzh9VxpBRxMmyeK2Shf8J3v1WKDhRgjPLx48g6kEay");
xively.feed.get("1358642428");
