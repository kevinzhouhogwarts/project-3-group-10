# Cancer Geography Data Visualization, Project 3, Group 10

## Overview
This project analyzes cancer prevalence, trends, and influencing factors across the United States. The data is derived from multiple public health sources and provides insights into the geographic distribution of cancer, disparities based on demographics, and associated risk factors like tobacco use.

## Collaborators
* Niaz Azar
* Aysenur Teyfur
* Kevin Zhou

## Data
### Chronic Disease Indicators (CDI)
Data comes from various federal and state public health programs and surveys. The measurements are based on CDI, a list of disease indicators that includes over 100 measurements, refreshed periodically in collaboration between the CDC and various state health departments. The disease indicators of focus for this project are the cancer-related measurements. For further reading, see the [2013 Indicators for Chronic Disease Surveillance report](https://www.cdc.gov/mmwr/preview/mmwrhtml/rr6401a1.htm).

### Base Dataset
The chronic disease dataset used for cancer incidence is available at [data.gov](https://catalog.data.gov/dataset/u-s-chronic-disease-indicators-cdi).

### State of Florida data:
GeoJSON data regarding Florida county borders came from [geodata.floridagio.gov](https://geodata.floridagio.gov/). Information about historical cancer rates, smoking rates, and poverty rates by county came from [FLHealthCHARTS.gov](https://www.flhealthcharts.gov).

### Federal data:
Cigarette sales tax data by state came from [TaxFoundation.org](https://taxfoundation.org/data/all/state/state-sales-gasoline-cigarette-and-alcohol-tax-rates/). State border GeoJSON data from [eric.clst.org](https://eric.clst.org/tech/usgeojson/).

## Narrative
### Cancer Prevalence Analysis:
The first section explores national cancer incidence data between 2008 to 2012, showing the distribution of cancer cases across different states. It includes:
* Maps showing invasive cancer incidence rates per 100,000 people
* Identification of regions with higher cancer rates, especially on the east coast
* Clearly shows some states have higher cancer rates than others
### Demographic Trends:
* Analysis of cancer prevalence and trends based on race/ethnicity and gender
* Gender comparison showing higher cancer rates in males than in females
* Racial and gender disparities in cancer rates hint at significant health inequalities
### Tobacco Usage Data:
* Explores national prevalence of tobacco use, which is a major risk factor for cancer
* National trends for both adult and youth tobacco use
* Gender-based trends, highlighting the contribution of smoking to lung cancer
* Clearly demonstrates the well-known link between smoking and lung cancer rates
### Geographic Disparities:
* Disparities in cancer rates within states, such as the difference in lung cancer rates between Northern and Southern Florida
* Discusses how environmental factors and lifestyle choices (i.e., smoking) contribute to these disparities

# Code

## Data Cleaning
After first streamlining the data by using select queries on the raw data stored within a PostgreSQL database, data cleaning was performed in pandas. While there were some null values present in the data, the bulk of the data cleaning was actually narrowing down and identifying the subset of rows to use, since the dataset contained disease indicator variables further segmented by gender, race, location (state), year, data type, and data source. These SQL queries and pandas operations are contained mainly in `Lung_Cancer`, `Tobacco`, and within other Jupyter Notebook files within the repository.

## Visualization in pandas
### Python Libraries:
The code relies on Python visualization libraries, including:
◦	matplotlib for plotting graphs and charts
◦	geopandas for some geographical data visualization (mapping cancer incidence)
◦	seaborn for enhanced data visualization

## Visualization by Leaflet
Three Leaflet visualizations were constructed:
* National level with cancer rates of 50 states visualized
* National level with lung cancer and smoking rates visualized
* State level (Florida) with lung cancer and smoking rates visualized

In order to display disease indicators and other variables on the national and state maps, those values had to be inserted into the properties of the GeoJSON files, using pandas. Preparation of the GeoJSON files and the ultimate graphing using Leaflet were performed within the `Leaflet_x` folders.


# Conclusion
The Chronic Disease Indicators allow for comparative analysis of a variety of disease measurements between states. However, due to the myriad factors impacting health and disease incidence, to even begin to draw correlations and conclusions regarding the causes or associations of disease, even more external data is needed.

With some easily-accessible data for just a few variables such as cigarette sales tax and poverty rate, we were able to verify the broad strokes of the landscape of lung cancer and smoking in the United States and in one state in particular (Florida). This suggests that even more convoluted and minute observations about disease incidence and association could be elucidated by following a similar method of plotting various socioeconomic factors versus the measurements found in the CDI.
