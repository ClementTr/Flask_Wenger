var data_regions_jour = [
  {"name": "Lundi", "value": 8044, "hex": "#B8381F"},
  {"name": "Mardi", "value": 5720, "hex": "#EAD352"},
  {"name": "Mercredi", "value": 2278, "hex": "#3D4477"},
  {"name": "Jeudi", "value": 1901, "hex": "#539D99"},
  {"name": "Samedi", "value": 1693, "hex": "#375F35"},
  {"name": "Dimanche", "value": 1286, "hex": "#B96C36"}
]
var visualization = d3plus.viz()
  .container("#viz0")
  .title("Répartition par type de point de vente\n")
  .color('hex')
  .data(data_regions_jour)
  .type("bar")
  .id("name")
  .x("name")
  .y("value")
  .legend({"size": 0})
  .draw()
