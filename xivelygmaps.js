/**
 * Created by inyun2u on 14. 5. 19.
 */// xively-gmaps
// version 0.1.1
// (c) 2013 Xively Ltd (LogMeIn Inc.)
// http://xively.github.com/xively-gmaps/
// BSD 3-Clause license

var xivelyGmaps = (function ($) {
    "use strict";

    var methods,
        APIendpoint = "https://api.xively.com/v2/",
        WSendpoint = "wss://api.xively.com:8080/",
        previousLocation,
        previousValue,
        map,
        marker,
        markers=[],
        mapElement = "#map-canvas";


    methods = {
        setKey: function (apiKey) {
            xively.setKey(apiKey);
        },

        setApiEndpoint: function (api_endpoint) {
            xively.setEndpoint(api_endpoint || APIendpoint)
        },

        setWsEndpoint: function (ws_endpoint) {
            xively.setWSEndpoint();
        },

        subscribe: function (feed_id) {
            var self = this;
            xively.feed.get(feed_id, function (feedData) {
                self.renderMap(feedData);
            });

            xively.feed.subscribe(feed_id, function (event, feedData) {
                self.renderMap(feedData);

            });
        },

        setMapElement: function (ele) {
            mapElement = ele;
        },

        renderMap: function (feedData) {
            var self = this;
            var location = feedData.location;
            var cur_value = feedData.datastreams[0].current_value;


            if (feedData) {
                var position = new google.maps.LatLng(feedData.datastreams[1].current_value, feedData.datastreams[2].current_value);
                var position1 = new google.maps.LatLng(feedData.datastreams[4].current_value, feedData.datastreams[5].current_value);
                var markerTitle = "Feed id: " + feedData.id + "\n" +
                    "Latitude: " + location.lat + "\n" +
                    "Longitude: " + location.lon + "\n" +
                    "value" + feedData.datastreams[0].current_value;

                var markerTitle1 = "Feed id: " + feedData.id + "\n" +
                    "Latitude: " + location.lat + "\n" +
                    "Longitude: " + location.lon + "\n" +
                    "value" + feedData.datastreams[3].current_value;



                if (typeof (previousLocation) === 'undefined') {
                    var mapOptions = {
                        center: position,
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.ROAD_MAP
                    };

                    map = new google.maps.Map($(mapElement)[0], mapOptions);
                    self.setMarker(position, markerTitle, feedData.datastreams[0].current_value);
                    self.setMarker(position1,markerTitle1,feedData.datastreams[3].current_value);


                } else if ((previousValue !== cur_value)) { //값의 변화가 있을 경우
                    markers[0].setMap(null);
                    markers[1].setMap(null);
                    markers=[];//현재 마커와 지도의 매핑 해제

                    self.setMarker(position, markerTitle, feedData.datastreams[0].current_value);
                    self.setMarker(position1,markerTitle1,feedData.datastreams[3].current_value);
                }
                previousValue = cur_value;
                previousLocation = location;
            } else {
                $(mapElement).html("Awaiting Location Data");
            }
        },

        checkValidLocation: function (location) {
            return location && location.lat && location.lon;
        },

        setMarker: function (position, title, value) {

            marker = new google.maps.Marker({
                position: position,
                map: map,
                zoom: 13,
                title: title,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'red',
                    fillOpacity: 1,
                    scale: Math.log(value) * 10 / Math.PI,
                    strokeColor: 'white',
                    strokeWeight: .5
                }
            });
            markers.push(marker);

        }
    };

    return methods;
})(jQuery);