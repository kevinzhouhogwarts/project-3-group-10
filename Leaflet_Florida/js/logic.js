// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
  center: [27.6648, -81.5158],
  zoom: 6
});

// Adding a tile layer (the background map image) to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

d3.json("../data/florida_counties_updated.geojson").then(function(data) {
  // Create first GeoJSON layer
  let florida_counties = L.geoJSON(data, {
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

  // Create a second GeoJSON layer and add it to the map
  let florida_counties_lung_cancer = L.choropleth(data, {
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

  // Create a third GeoJSON layer and add it to the map
  let florida_counties_smoking = L.choropleth(data, {
    valueProperty: "Adult_Smoker_Rate_2013",
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

  // Create a fourth GeoJSON layer and add it to the map
  let florida_counties_poverty = L.choropleth(data, {
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

  let overlayLayers = {
    "Florida Counties": florida_counties,
    "Lung Cancer Incidence, per 100k, 2013-2015": florida_counties_lung_cancer,
    "Adult Smoking Rate, 2013": florida_counties_smoking,
    "Poverty Rate, 2013-2015": florida_counties_poverty
  };

  L.control.layers(null, overlayLayers, {collapsed: false}).addTo(myMap);
});



