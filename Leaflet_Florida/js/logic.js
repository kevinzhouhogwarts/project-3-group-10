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

d3.json("../data/florida_counties_updated.json").then(function(data) {
  // Create first GeoJSON layer
  let florida_counties = L.geoJSON(data, {
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
  let florida_counties_lung_cancer = L.choropleth(data, {
    valueProperty: "Lung_Cancer_Rate_2013-2015",
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
      let popupContent = `<strong>${feature.properties.NAME}</strong><br> ${feature.properties["Lung_Cancer_Rate_2013-2015"]} per 100,000`;

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

  // Create third layer for all invasive cancers
  let florida_counties_smoking = L.choropleth(data, {
    valueProperty: "Adult_Smoker_Rate_2013",
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
      let popupContent = `<strong>${feature.properties.NAME}</strong><br> ${feature.properties["Adult_Smoker_Rate_2013"]}%`;

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

  // Create fourth layer for all invasive cancers
  let florida_counties_poverty = L.choropleth(data, {
    valueProperty: "Poverty_Rate_2013-2015",
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
      let popupContent = `<strong>${feature.properties.NAME}</strong><br>Poverty_Rate_2013-2015 ${feature.properties["Poverty_Rate_2013-2015"]}%`;

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
    "Florida Counties": florida_counties,
    "Lung Cancer Incidence, per 100k, 2013-2015": florida_counties_lung_cancer,
    "Adult Smoking Rate, 2013": florida_counties_smoking,
    "Poverty Rate, 2013-2015": florida_counties_poverty
  };

  L.control.layers(null, overlayLayers, {collapsed: false}).addTo(myMap);
});