var map = L.map('leaflet', {
  'center': [30, 2.287592000000018],
  'zoom': 3,
  'layers': [
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    })
  ]
});



var my_div = document.getElementById("description");
var my_h1 = document.querySelector("#description>h1");
var my_img = document.querySelector("#description>center>img");
var my_year = document.querySelector("#description>center>#year");
var my_description = document.querySelector("#description>center>#travel_description");

function onClick(){
  my_h1.innerHTML = dic_markers[this.options.myCustomId].location;
  my_img.src = dic_markers[this.options.myCustomId].photo;
  my_year.innerHTML = dic_markers[this.options.myCustomId].year;
  my_description.innerHTML = dic_markers[this.options.myCustomId].travel_description;
}

var dic_markers = {
  'malte':{
    photo: 'img/map/malte.jpg',
    location: 'Malta',
    year: 1998,
    travel_description: "Malta, description coming soon"
  },
  'tozeur':{
    photo: 'img/map/tozeur.jpg',
    location: 'Tozeur',
    year: 2001,
    travel_description: "Tozeur, description coming soon"
  },
  'louxor':{
    photo: 'img/map/no.png',
    location: 'Louxor',
    year: 2002,
    travel_description: "Louxor, description coming soon"
  },
  'canaries':{
    photo: 'img/map/no.png',
    location: 'Canarias',
    year: 2003,
    travel_description: "Canarias, description coming soon"
  },
  'marrakech':{
    photo: 'img/map/no.png',
    location: 'Marrakech',
    year: 2004,
    travel_description: "Marrakech, description coming soon"
  },
  'guadeloupe':{
    photo: 'img/map/no.png',
    location: 'Guadeloupe',
    year: 2005,
    travel_description: "Guadeloupe, description coming soon"
  },
  'djerba':{
    photo: 'img/map/no.png',
    location: 'Djerba',
    year: 2005,
    travel_description: "Djerba, description coming soon"
  },
  'ouarzazate':{
    photo: 'img/map/no.png',
    location: 'Ouarzazate',
    year: 2006,
    travel_description: "Ouarzazate, description coming soon"
  },
  'calp':{
    photo: 'img/map/no.png',
    location: 'Calp',
    year: 2006,
    travel_description: "Calp, description coming soon"
  },
  'saly':{
    photo: 'img/map/no.png',
    location: 'Saly',
    year: 2006,
    travel_description: "Saly, description coming soon"
  },
  'rhodes':{
    photo: 'img/map/no.png',
    location: 'Rodos',
    year: 2007,
    travel_description: "Rodos, description coming soon"
  },
  'martinique':{
    photo: 'img/map/no.png',
    location: 'Martinique',
    year: 2008,
    travel_description: "Martinique, description coming soon"
  },
  'sicile':{
    photo: 'img/map/no.png',
    location: 'Sicilia',
    year: 2008,
    travel_description: "Sicilia, description coming soon"
  },
  'corfou':{
    photo: 'img/map/no.png',
    location: 'Corfou',
    year: 2009,
    travel_description: "Corfou, description coming soon"
  },
  'londres':{
    photo: 'img/map/londres.jpg',
    location: 'London',
    year: 2014,
    travel_description: "London, description coming soon"
  },
  'budapest':{
    photo: 'img/map/budapest.jpg',
    location: 'Budapest',
    year: 2015,
    travel_description: "Budapest, description coming soon"
  },
  'barcelone':{
    photo: 'img/map/barcelone.jpg',
    location: 'Barcelona',
    year: 2015,
    travel_description: "Barcelona, description coming soon"
  },
  'nice':{
    photo: 'img/map/nice.jpg',
    location: 'Nice',
    year: 2016,
    travel_description: "Nice, description coming soon"
  },
  'madrid':{
    photo: 'img/map/madrid.jpg',
    location: 'Madrid',
    year: 2016,
    travel_description: "Madrid, description coming soon"
  },
  'rome':{
    photo: 'img/map/no.png',
    location: 'Roma',
    year: 2017,
    travel_description: "Roma, description coming soon"
  },
  'suisse':{
    photo: 'img/map/suisse.jpeg',
    location: 'Genève',
    year: 2018,
    travel_description: "Genève, description coming soon"
  },
  'paris':{
    photo: 'img/map/no.png',
    location: 'Paris',
    year: "-",
    travel_description: "Paris, description coming soon"
  }
}

var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [30, 60]
    }
});
var blueIcon = new LeafIcon({iconUrl: 'img/map/icon_blue.png'});
var greenIcon = new LeafIcon({iconUrl: 'img/map/icon_green.png'});
var redIcon = new LeafIcon({iconUrl: 'img/map/icon_red.png'});

/* MALTE 1998 */
var marker_malte = new L.Marker([35.903471, 14.495387], {myCustomId: 'malte', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* TOZEUR 2001 */
var marker_tozeur = new L.Marker([33.918534, 8.122932900000023], {myCustomId: 'tozeur', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* LOUXOR 2002 */
var marker_louxor = new L.Marker([25.687243, 32.639636], {myCustomId: 'louxor', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* CANARIES 2003 */
var marker_sicile = new L.Marker([28.29156369999999, -16.629130400000008], {myCustomId: 'canaries', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* MARRAKECH 2004 */
var marker_marrakech = new L.Marker([31.6294723, -7.981084499999952], {myCustomId: 'marrakech', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* GUADELOUPE 2005 */
var marker_guadeloupe = new L.Marker([16.265, -61.55099999999999], {myCustomId: 'guadeloupe', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* DJERBA 2005 */
var marker_djerba = new L.Marker([33.8075978, 10.845146699999987], {myCustomId: 'djerba', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* OUARZAZATE 2006 */
var marker_ouarzazate = new L.Marker([30.9335436, -6.937015999999971], {myCustomId: 'ouarzazate', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* CALP 2006
var marker_calp = new L.Marker([38.64364689999999, 0.045687600000064776], {myCustomId: 'calp', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);*/

/* SALY 2006 */
var marker_saly = new L.Marker([14.443593, -16.988990400000034], {myCustomId: 'saly', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* RHODES 2007 */
var marker_rhodes = new L.Marker([36.4340533, 28.2176379], {myCustomId: 'rhodes', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* MARTINIQUE 2008 */
var marker_martinique = new L.Marker([14.641528, -61.024174000000016], {myCustomId: 'martinique', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* SICILE 2008 */
var marker_sicile = new L.Marker([37.5999938, 14.015355699999986], {myCustomId: 'sicile', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* CORFOU 2009 */
var marker_corfou = new L.Marker([39.624262, 19.921678], {myCustomId: 'corfou', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* LONDRES 2014 */
var marker_london = new L.Marker([51.554888, -0.108438], {myCustomId: 'londres', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* BUDAPEST 2015 */
var marker_budapest = new L.Marker([47.497912, 19.040235], {myCustomId: 'budapest', icon: greenIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* BARCELONE 2015 */
var marker_barcelone = new L.Marker([41.385064, 2.173403], {myCustomId: 'barcelone', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* MADRID 2016 */
var marker_madrid = new L.Marker([40.413980, -3.682179], {myCustomId: 'madrid', icon: blueIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* NICE 2016 */
var marker_nice = new L.Marker([43.686011, 7.295201], {myCustomId: 'nice', icon: greenIcon})
   .addTo(map)
   .on('mousedown', onClick);

/* ROME 2017 */
var marker_rome = new L.Marker([41.902783, 12.496366], {myCustomId: 'rome', icon: blueIcon})
  .addTo(map)
  .on('mousedown', onClick);

/* SUISSE 2018 */
var marker_suisse = new L.Marker([46.4312213, 6.910679899999991], {myCustomId: 'suisse', icon: blueIcon})
  .addTo(map)
  .on('mousedown', onClick);

/* PARIS */
var marker_paris = new L.Marker([48.826294, 2.346419], {myCustomId: 'paris', icon: redIcon})
  .addTo(map)
  .on('mousedown', onClick);
