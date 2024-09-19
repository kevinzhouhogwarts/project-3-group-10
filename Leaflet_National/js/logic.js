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

d3.json("../data/state_updated.json").then(function(data) {
  // Create first GeoJSON layer
  let state_borders = L.geoJSON(data, {
    style: function(feature) {
      return {
        color: "purple",     // Border color for polygons
        weight: 1,         // Border width
        fillColor: "lightblue",  // Fill color inside polygons
        fillOpacity: 0.25   // Fill opacity
      };
    },
    // Bind popup to show on mouseover
    onEachFeature: function(feature, layer) {
      // Show the popup on mouseover
      layer.on('mouseover', function(e) {
        layer.bindPopup(feature.properties.NAME).openPopup();
      });

      // Hide the popup on mouseout
      layer.on('mouseout', function(e) {
        layer.closePopup();
      });
    }
  }).addTo(myMap);

  // Create second layer for all invasive cancers
  let all_invasive = L.choropleth(data, {
    valueProperty: "Invasive Cancer Rate, 2008-2012",
    scale: ["#fee6ce", "#e6550d"],
    steps: 10,
    mode: "q",
    style: {
      color: "purple",
      weight: 1,
      fillOpacity: 0.8,
    },
    // Bind popup to show on mouseover
    onEachFeature: function(feature, layer) {
      // Create the popup content
      let popupContent = `<strong>${feature.properties.NAME}</strong><br>Invasive Cancer Rate (2008-2012): ${feature.properties["Invasive Cancer Rate, 2008-2012"]}`;

      // Bind the popup to the layer
      layer.bindPopup(popupContent);

      // Handle mouseover event (open the popup)
      layer.on('mouseover', function(e) {
        // Use the leaflet openPopup method on the target layer
        this.openPopup();
      });

      // Handle mouseout event (close the popup)
      layer.on('mouseout', function(e) {
        // Close the popup
        this.closePopup();
      });
    }
  });

  let overlayLayers = {
    "United States": state_borders,
    "All Invasive Cancers, Incidence": all_invasive
  };

  L.control.layers(null, overlayLayers, {collapsed: false}).addTo(myMap);
});



