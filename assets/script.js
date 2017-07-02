'use-strict';

// Declearing app var-s
var map, infoWindow;
var markers = [];
var placeMarkers = [];

// Declearing map function to draw map on screen
  function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 30.044611, lng: 31.235464},
          zoom: 12,
          mapTypeControl: false
        });
      
      infowindow = new google.maps.InfoWindow();

      var locations = [
          {title: 'El Ziraeyeen Hospital', location: {lat: 30.042030, lng: 31.211351},phone:'02 33350899',address:'Zainab Kamel Hasan, Ad Doqi, Giza Governorate'},
    
          {title: 'Al Rowad Eyes Hospital', location: {lat:30.038475,lng:31.207379},phone:'02 33361662',address:'29, Iran, Ad Doqi, Giza, Giza Governorate'},
    
          {title: 'Kids Hospital', location: {lat:30.048293,lng:30.048293},phone:'02 37495030',address:'Gameat Al Dewal Al Arabeya, Mit Akaba, Al Agouzah, Giza Governorate'},
    
          {title: 'Safa Hospital - D. Samir Talaat', location: {lat:30.051497,lng:31.197481},phone: '02 33361010',address:'40 Iraq, Gazirat Mit Oqbah, Giza, Giza Governorate'},
    
          {title: 'Al Amal Hospital', location: {lat:30.055563,lng:31.191594},phone:'02 33479212',address:'25 Fawzi Ramah Square, Mit Akaba, Al Omraneyah، Giza Governorate'},
    
          {title: 'Misr International Hospital', location: {lat:30.043283,lng:31.216427},phone:'02 37608261',address:'12 El Saraya St.، Ad Doqi, Giza, Giza Governorate'},
    
          {title: 'Kasr El Aini Teaching Hospital', location: {lat:30.031798,lng:31.228789},phone:'02 23654060',address:'27 Nafezet Sheem El Shafaey St.، KASR EL AINY، Al Manial, Cairo Governorate'},
    
          {title: 'El Manial Specialized University Hospital', location: {lat:30.032197,lng:31.227212},phone:'02 23634260',address:'abdel aziz Al Saoud st.، MANIAL EL RODA، Al Manial, Cairo Governorate'},
    
         
        ];
      // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
            
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
            
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
          });
            
          // Push the marker to our array of markers.
          markers.push(marker);
            
          // Create an onclick event to open the large infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, Infowindow);
          });
          
        }
  };

  function googleCallBack() {
      console.log("Error Loading The Map");
  }




 