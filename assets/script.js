'use-strict';

// Declearing app var-s
var map,infoWindow,
    self = this;

// Declearing map function to draw map on screen
  function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 30.044611, lng: 31.235464},
          zoom: 10,
          mapTypeControl: false
        });
  }

  function googleCallBack() {
      console.log("Error Loading The Map");
  }

// Declearing Model
  var Model = [
      {
          "name": "El Ziraeyeen Hospital",
          "LatLng": [30.042030,31.211351],
          "phone": "02 33350899",
          "address": "Zainab Kamel Hasan, Ad Doqi, Giza Governorate",
          "imgs": []
      },
      {
          "name": "Al Rowad Eyes Hospital",
          "LatLng": [30.038475,31.207379],
          "phone": "02 33361662",
          "address": "29, Iran, Ad Doqi, Giza, Giza Governorate",
          "imgs": []
      },
      {
          "name": "Kids Hospital",
          "LatLng": [30.048293,30.048293],
          "phone": "02 37495030",
          "address": "Gameat Al Dewal Al Arabeya, Mit Akaba, Al Agouzah, Giza Governorate",
          "imgs": []
      },
      {
          "name": "Safa Hospital - D. Samir Talaat",
          "LatLng": [30.051497,31.197481],
          "phone": "02 33361010",
          "address": "40 Iraq, Gazirat Mit Oqbah, Giza, Giza Governorate",
          "imgs": []
      },
      {
          "name": "Al Amal Hospital",
          "LatLng": [30.055563,31.191594],
          "phone": "02 33479212",
          "address": "25 Fawzi Ramah Square, Mit Akaba, Al Omraneyah، Giza Governorate",
          "imgs": []
      },
      {
          "name": "Misr International Hospital",
          "LatLng": [30.043283,31.216427],
          "phone": "02 37608261",
          "address": "12 El Saraya St.، Ad Doqi, Giza, Giza Governorate",
          "imgs": []
      },
      {
          "name": "Kasr El Aini Teaching Hospital",
          "LatLng": [30.031798,31.228789],
          "phone": "02 23654060",
          "address": "27 Nafezet Sheem El Shafaey St.، KASR EL AINY، Al Manial, Cairo Governorate",
          "imgs": []
      },
      {
          "name": "El Manial Specialized University Hospital",
          "LatLng": [30.032197,31.227212],
          "phone": "02 23634260",
          "address": "abdel aziz Al Saoud st.، MANIAL EL RODA، Al Manial, Cairo Governorate",
          "imgs": []
      },
      {
          "name": "As-Salam International Hospital",
          "LatLng": [29.984847,31.230385],
          "phone": "19885",
          "address": "Corniche El Nile، Athar an Nabi, Misr Al Qadimah, Cairo Governorate",
          "imgs": []
      },
      {
          "name": "Nile Badrawi Hospital",
          "LatLng": [29.982326,31.231443],
          "phone": "02 25240022",
          "address": "Athar an Nabi, Misr Al Qadimah, Cairo Governorate",
          "imgs": []
      },
  ];



// Declearing the ViewModel

