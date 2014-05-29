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



xively.setKey("6x9rs1UD4w8DRqmaDZEagvBEnmHaegALrbR36V4ybspipOsS");
xively.feed.get("1340702799",function(feedData){
    console.log(feedData.datastreams[0].current_value);
});



