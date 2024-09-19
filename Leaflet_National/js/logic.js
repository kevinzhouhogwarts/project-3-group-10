// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
  center: [39.8282, -98.5795],
  zoom: 4
});

// Adding a tile layer (the background map image) to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

d3.json("../data/state.json").then(function(data) {
  // Create first GeoJSON layer
  let state_borders = L.geoJSON(data, {
    style: function(feature) {
      return {
        color: "blue",     // Border color for polygons
        weight: 1,         // Border width
        fillColor: "lightblue",  // Fill color inside polygons
        fillOpacity: 0.25   // Fill opacity
      };
    },
    // Bind county name popup to layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.NAME);
    }
  }).addTo(myMap);

  // Create second layer for all invasive cancers
  let all_invasive = L.choropleth(data, {
    valueProperty: "Lung_Cancer_Rate_2013-2015",
    scale: ["#fee6ce", "#e6550d"],
    steps: 10,
    mode: "q",
    style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
    },
    // Bind county name popup to layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.NAME);
    }
  });

  // Create a third layer for female breast cancer
  let female_breast = L.choropleth(data, {
    valueProperty: "Female Breast Cancer Incidence",
    scale: ["#fee6ce", "#e6550d"],
    steps: 10,
    mode: "q",
    style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
    },
    // Bind county name popup to layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.NAME);
    }
  });

  // Create a fourth layer for colorectal cancer
  let colorectal = L.choropleth(data, {
    valueProperty: "Poverty_Rate_2013-2015",
    scale: ["#fee6ce", "#e6550d"],
    steps: 10,
    mode: "q",
    style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
    },
    // Bind county name popup to layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.NAME);
    }
  });

  // Create a fifth layer for prostate cancer
  let prostate = L.choropleth(data, {
    valueProperty: "Poverty_Rate_2013-2015",
    scale: ["#fee6ce", "#e6550d"],
    steps: 10,
    mode: "q",
    style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
    },
    // Bind county name popup to layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.NAME);
    }
  });

  // Create a sixth layer for cervical cancer
  let cervical = L.choropleth(data, {
    valueProperty: "Cervical Cancer Incidence",
    scale: ["#fee6ce", "#e6550d"],
    steps: 10,
    mode: "q",
    style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
    },
    // Bind county name popup to layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.NAME);
    }
  });

  let overlayLayers = {
    "United States": state_borders,
    "All Invasive Cancers, Incidence": all_invasive,
    "Female Breast Cancer, Incidence": female_breast,
    "Colorectal Cancer, Incidence": colorectal,
    "Prostate Cancer, Incidence": prostate,
    "Cerivcal Cancer, Incidence": cervical
  };

  L.control.layers(null, overlayLayers, {collapsed: false}).addTo(myMap);
});



