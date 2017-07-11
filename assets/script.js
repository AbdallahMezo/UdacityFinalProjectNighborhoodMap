'use-strict';

// Declearing app var-s
var map, infoWindow;
var markers = [];
var placeMarkers = [];
var locations = [
    {
        title: 'El Ziraeyeen Hospital',
        location: {
            lat: 30.042030,
            lng: 31.211351
        },
        phone: '02 33350899',
        address: 'Zainab Kamel Hasan, Ad Doqi, Giza Governorate'
    },

    {
        title: 'Al Rowad Eyes Hospital',
        location: {
            lat: 30.038475,
            lng: 31.207379
        },
        phone: '02 33361662',
        address: '29, Iran, Ad Doqi, Giza, Giza Governorate'
    },

    {
        title: 'Kids Hospital',
        location: {
            lat: 30.048293,
            lng: 30.048293
        },
        phone: '02 37495030',
        address: 'Gameat Al Dewal Al Arabeya, Mit Akaba, Al Agouzah, Giza Governorate'
    },

    {
        title: 'Safa Hospital - D. Samir Talaat',
        location: {
            lat: 30.051497,
            lng: 31.197481
        },
        phone: '02 33361010',
        address: '40 Iraq, Gazirat Mit Oqbah, Giza, Giza Governorate'
    },

    {
        title: 'Al Amal Hospital',
        location: {
            lat: 30.055563,
            lng: 31.191594
        },
        phone: '02 33479212',
        address: '25 Fawzi Ramah Square, Mit Akaba, Al Omraneyah، Giza Governorate'
    },

    {
        title: 'Misr International Hospital',
        location: {
            lat: 30.043283,
            lng: 31.216427
        },
        phone: '02 37608261',
        address: '12 El Saraya St.، Ad Doqi, Giza, Giza Governorate'
    },

    {
        title: 'Kasr El Aini Teaching Hospital',
        location: {
            lat: 30.031798,
            lng: 31.228789
        },
        phone: '02 23654060',
        address: '27 Nafezet Sheem El Shafaey St.، KASR EL AINY، Al Manial, Cairo Governorate'
    },

    {
        title: 'El Manial Specialized University Hospital',
        location: {
            lat: 30.032197,
            lng: 31.227212
        },
        phone: '02 23634260',
        address: 'abdel aziz Al Saoud st.، MANIAL EL RODA، Al Manial, Cairo Governorate'
    },
        ];

// Declearing map function to draw map on screen
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.048448,
            lng: 31.203926
        },
        zoom: 14,
        mapTypeControl: false
    });




    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {




        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        var phone = locations[i].phone;
        var address = locations[i].address;

        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            address: address,
            phone: phone,
            animation: google.maps.Animation.DROP,
        });

        // Push the marker to our array of markers.
        markers.push(marker);
        marker.setMap(map);


        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function () {
            populateInfoWindow(this, infoWindow);
        });






    }
};

function googleCallBack() {
    console.log("Error Loading The Map");
}

function populateInfoWindow(marker, infoWindow) {
    var infoWindow = new google.maps.InfoWindow();
    // Check to make sure the infowindow is not already opened on this marker.

    if (infoWindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infoWindow.setContent('<p><b>Hospital Name:</b> ' + marker.title + '</p><br>' + '<p><b>Address: </b>' + marker.address + '</p><br>' + '<p><b>Phone: </b>' + marker.phone + '</p>');
        infoWindow.marker = marker;

        // Make sure the marker property is cleared if the infowindow is closed.
        infoWindow.addListener('closeclick', function () {
            infoWindow.marker = null;
        });


        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    marker.setAnimation()
                }, 1500);
            }
        }

        marker.addListener('click', toggleBounce());


        // Open the infowindow on the correct marker.
        infoWindow.open(map, marker);
    }
}

var AppViewModel = function () {
    var self = this;
    self.markers = ko.observableArray([]);
    self.locations = ko.observableArray(locations);
    self.filteredArray = ko.observableArray([]);
    self.search = ko.observable("");
    self.filter = ko.observable("");

    self.map = ko.observable(map);

    self.filteredArray = ko.computed(function () {
        return ko.utils.arrayFilter(self.locations(), function (item) { //use it for filter locations using words
            if (item.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) { //transform all words in name to lower case and check if it in list location or no 
                if (item.marker) // if this marker is exsit
                    item.marker.setMap(self.map()); //view it in map
            } else {
                if (item.marker) // if this marker is not exsit
                    item.marker.setMap(null); //remove all points from map
            }


            return item.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1;

        });
    }, self);

    self.clickHandler = function (data) {
        centerLocation(data, self.map(), self.markers);
        var infoWindow = new google.maps.InfoWindow({
            content: data.marker.content
        });
        for (var i = 0; i < self.markers.length; i++) {
            self.markers[i].infowindow.close();
        }
        infoWindow.open(self.map(), marker);
    };

    function centerLocation(locations, map, markers) {
        for (var i = 0; i < markers().length; i++) {
            markers()[i].infowindow.close();
        }
        map.setCenter(new google.maps.LatLng(locations.location[0], locations.location[1]));
        map.setZoom(12);
        for (var n = 0; n < markers().length; n++) {
            var content = markers()[n].content.split('<br>');
            if (data.name === content[0]) {
                toggleBounce(markers()[n]);
            }
        }
    }

};

var appViewModel = new AppViewModel();

ko.applyBindings(appViewModel);
