// Declearing app variables
var map, infoWindow;
var markers = [];
var placeMarkers = [];
// Creating the locations as a model
var locations = [{
        title: '57357 Hospital',
        location: {
            lat: 30.023140,
            lng: 31.237813
        },
        phone: '02 25351500',
        address: 'CAIRO, EL SAYEDA ZEINAB، Magra El-Eyoun, Zeinhom, El-Sayeda Zainab, Cairo Governorate'
    },

    {
        title: 'Coptic Hospital',
        location: {
            lat: 30.063750,
            lng: 31.252484
        },
        phone: '02 25899866',
        address: 'Ramsis st. extension - beside NBE branch - Cairo, Al Fagalah, Al Azbakeyah, Cairo Governorate 11432'
    },

    {
        title: 'Kids Hospital',
        location: {
            lat: 30.048526,
            lng: 31.194607
        },
        phone: '02 37495030',
        address: 'Gameat Al Dewal Al Arabeya, Mit Akaba, Al Agouzah, Giza Governorate'
    },


    {
        title: 'Qasr El Eyni Hospital',
        location: {
            lat: 30.031939,
            lng: 31.228970
        },
        phone: '02 23654060',
        address: '27 Nafezet Sheem El Shafaey St.، KASR EL AINY، Al Manial, Cairo Governorate'
    },

    {
        title: 'Nile Badrawi Hospital',
        location: {
            lat: 29.982373,
            lng: 31.231282
        },
        phone: '02 25240022',
        address: 'Athar an Nabi, Misr Al Qadimah, Cairo Governorate'
    },

    {
        title: 'Ain Shams University Specialized Hospital',
        location: {
            lat: 30.076611,
            lng: 31.289920
        },
        phone: '0115 350 3322',
        address: 'El-Khalifa El-Maamoun, El-Qobba Bridge, Al Waili, Cairo Governorate'
    },
];


// Declearing map function to draw map on screen 
// This part of the code was done by the help of Google Maps API course's material
function initMap() {

    // Define the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.028803,
            lng: 31.219015
        },
        zoom: 12,
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

        // Call marker of locations to the appViewModel
        appViewModel.locations()[i].marker = marker;
    }
    var infoWindow = new google.maps.InfoWindow();
};



// Create the InfoWindow function
function populateInfoWindow(marker, infoWindow) {


    // Check to make sure the infowindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
        var hospitalName = marker.title;
        var wikiURL = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + hospitalName;
        var str = "";
        $.ajax({
            url: wikiURL,
            dataType: "jsonp",
            success: function (response) {
                console.log(response);
                var articleList = response[1];
                var locName = response[0];
                if (articleList.length > 0) {
                    for (var article in articleList) {
                        if (articleList.hasOwnProperty(article)) {
                            var element = articleList[article];
                            str = "<li><a href='https://en.wikipedia.org/wiki/" + element + "'>" + element + "</a></li>"
                        }
                    }
                } else {
                    str = "<li><a href='https://en.wikipedia.org/w/index.php?title=Special:Search&fulltext=1&search=" + locName.replace(' ', '+') + "'>" + locName + "</a></li>"
                }

                // Create the info window content 
                infoWindow.setContent('<p><b>Hospital Name:</b> ' + marker.title + '</p><br>' + '<p><b>Address: </b>' + marker.address + '</p><br>' + '<p><b>Phone: </b>' + marker.phone + '</p> <br>' + '<b><p>Wiki Articles:</p><br>' + str);
                infoWindow.marker = marker;

                // Make sure the marker property is cleared if the infowindow is closed.
                infoWindow.addListener('closeclick', function () {
                    infoWindow.marker = null;
                });

                // Define the Bounce Animation while call the marker
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
                str = "";
            }
        }).fail(function (jqXHR, textStatus) {
                    alert("There is an Error loading Wikipedia API");
                    });
    }
}


// Create the VM of the app 'AppViewModel'
// This part was done by some help of Karol from Forum and 1:1 Appointment session
// Also with the help of my mentor Sagar Choudhary through the mentorship support and both should be appreciated , they are great
// some functions and methods ideas are done through some github and google searches 

var AppViewModel = function () {

    // Creating the VM variables 
    var self = this;
    self.markers = ko.observableArray([]);
    self.locations = ko.observableArray(locations);
    self.filteredArray = ko.observableArray([]);
    self.filter = ko.observable("");
    self.map = map;
    self.filteredArray = ko.computed(function () {

        // Declearing the filter functions to filter text through words
        return ko.utils.arrayFilter(self.locations(), function (item) {

            // Check if search text is exicts or not
            if (item.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {

                // if it exists set the map view to the marker if not remove all markers
                if (item.marker)
                    item.marker.setVisible(true);
            } else {
                if (item.marker)
                    item.marker.setVisible(false);
            }
            return item.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1;
        });
    }, self);



    // Handle the click on the list to trigger the infowindow
    self.clickHandler = function (locations) {
        google.maps.event.trigger(locations.marker, 'click');
    };
};

// Instantiate the ViewModel
var appViewModel = new AppViewModel();

// Apply the binding
ko.applyBindings(appViewModel);


// Handeling Error if the map didn't loads
function googleCallBack() {
    alert("Error Loading The Map");
}
