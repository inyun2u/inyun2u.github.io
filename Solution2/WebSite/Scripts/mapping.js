var keys = [
    {
        key: "6x9rs1UD4w8DRqmaDZEagvBEnmHaegALrbR36V4ybspipOsS",
        feed: "1340702799"
    },
    {
        key: "QuHWV9Uzh9VxpBRxMmyeK2Shf8J3v1WKDhRgjPLx48g6kEay",
        feed: "1358642428"
    }
]
var markers = [];
var feedContent = [];
var feedData = [];
var oldFeedData = [];

var myPosition;

for (var i = 0; i < keys.length-1; i++) {
    xively.setKey(keys[i].key);
    xively.feed.get(keys[i].feed, function (data) {
        feedData.push(data);
        
    });
    
}

var setMarker = function () {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(feedData[0].location.lat, feedData[0].location.lon),
        title: "hello",
    });
    markers[0] = marker;
    console.log(marker);
    markers[0].setMap(map);

    oldFeedData[0] = data;
};



