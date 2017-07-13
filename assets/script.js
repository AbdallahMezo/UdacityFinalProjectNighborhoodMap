
// Declearing app variables
var map, infoWindow;
var markers = [];
var placeMarkers = [];
// Creating the locations as a model
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
            lat: 30.048526,
            lng: 31.194607
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
// This part of the code was done by the help of Google Maps API course's material
function initMap() {
    
    // Define the map
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
        
        // Call marker of locations to the appViewModel
        appViewModel.locations()[i].marker = marker;
    }
};



// Create the InfoWindow function
function populateInfoWindow(marker, infoWindow) {
    var infoWindow = new google.maps.InfoWindow();
    
    // Check to make sure the infowindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
        var hospitalName = marker.title;
        var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + hospitalName + '&format=json&callback=wikiCallback';
        var str = "";
            $.ajax({
                url:wikiURL,
                dataType : "jsonp",
                success: function( respone ){
                    var articleList = respone[1];
                    for ( var i = 0;i < articleList.length; i++){
                        articleStr = articleList[i];
                        var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                        str += '<li><a href="' + url + '">' + articleStr + '</a></li>';
                        return str;
                    };
                }
            })
 
        // Create the info window content 
        infoWindow.setContent('<p><b>Hospital Name:</b> ' + marker.title + '</p><br>' + '<p><b>Address: </b>' + marker.address + '</p><br>' + '<p><b>Phone: </b>' + marker.phone + '</p> <br>' + '<b><p>Hospital Wiki Articles:</p><br>' + str );
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
    self.search = ko.observable("");
    self.filter = ko.observable("");
    self.map = ko.observable(map);
    self.filteredArray = ko.computed(function () {
        
        // Declearing the filter functions to filter text through words
        return ko.utils.arrayFilter(self.locations(), function (item) {
            
            // Check if search text is exicts or not
            if (item.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1) {
                
                // if it exists set the map view to the marker if not remove all markers
                if (item.marker)
                    item.marker.setMap(map);
            } else {
                if (item.marker) 
                    item.marker.setMap(null);
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
