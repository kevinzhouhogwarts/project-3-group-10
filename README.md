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

## Code:
### Cancer Prevalence Analysis:
◦	This section of the code explores national cancer incidence data from 2008 to 2012, showing the distribution of cancer cases across different states. It includes:
▪	Maps showing invasive cancer incidence rates per 100,000 people.
▪	Identification of regions with higher cancer rates, especially on the east coast.
### Demographic Trends:
◦	Analysis of cancer prevalence and trends based on race/ethnicity and gender. For example:
▪	White population: 59.3%
▪	Hispanic/Latino: 18.9%
▪	Black: 12.6%
▪	Asian: 5.9%
◦	Gender comparison showing higher cancer rates in males than in females.
### Tobacco Usage Data:
◦	Explores national prevalence of tobacco use, which is a major risk factor for cancer. This section includes:
▪	National trends for both adults and youth.
▪	Gender-based trends, highlighting the contribution of smoking to lung cancer (with smoking responsible for 85% of cases).
### Geographic Disparities:
◦	Focuses on disparities in cancer rates within states, such as the difference in lung cancer rates between Northern and Southern Florida.
◦	Discusses how environmental factors and lifestyle choices (e.g., smoking rates) contribute to these disparities.
Requirements
•	Python Libraries: The code relies on Python data analysis and visualization libraries, including:
◦	pandas for data manipulation
◦	matplotlib for plotting graphs and charts
◦	geopandas for geographical data visualization (mapping cancer incidence)
◦	seaborn for enhanced data visualization


# Import Dependencies
import pandas as pd
from pathlib import Path

# The path to our CSV file
health_data = Path("Resources/health_data_2023_cancer.csv")

# Read our data into pandas
health_data_df = pd.read_csv(health_data)
health_data_df.head()

# Filter the data to exclude 'Invasive cancer (all sites combined), incidence' and only include 'Cancer' in the 'Topic' column
filtered_df = health_data_df[
    (health_data_df['Topic'] == 'Cancer') &
    (health_data_df['Question'] != 'Invasive cancer (all sites combined), incidence')
]

# Remove rows where 'LocationDesc' is 'United States'
filtered_df = filtered_df[filtered_df['LocationDesc'] != 'United States']

# Group by 'LocationDesc' and calculate the mean 'DataValue' to get the average number of people with cancer by state
cancer_by_state = filtered_df.groupby('LocationDesc')['DataValue'].mean().reset_index()

# Sort the result by 'DataValue' in descending order
cancer_by_state_sorted = cancer_by_state.sort_values(by='DataValue', ascending=False)

# Display the sorted result
print(cancer_by_state_sorted)

# Import necessary libraries
import matplotlib.pyplot as plt

# Sort the DataFrame by 'DataValue' in descending order
cancer_by_state_sorted = cancer_by_state.sort_values(by='DataValue', ascending=False)

# Visualize the data using a bar plot
plt.figure(figsize=(12, 6))
plt.bar(cancer_by_state_sorted['LocationDesc'], cancer_by_state_sorted['DataValue'], color='skyblue')
plt.xlabel('State')
plt.ylabel('Number of People with Cancer')
plt.title('Number of People with Cancer by State')
plt.xticks(rotation=90)
plt.show()

filtered_df = health_data_df[(health_data_df['DataSource'] == 'Statewide central cancer registries') &
                 (health_data_df['StratificationCategory1'] == 'Overall')]

# Group by the filtered DataFrame and calculate the mean of DataValue
mean_data_value = filtered_df.groupby(['DataValueType', 'LocationDesc'])['DataValue'].mean().reset_index()
Running the Code
1	Clone this repository.
2	Install the required libraries using pip install -r requirements.txt.
3	Load the dataset by following the instructions in the notebook. Data must be formatted similarly to the Chronic Disease Indicators dataset.
4	Run the Jupyter notebook to generate insights and visualizations.
Data Insights:
•	Cancer Prevalence: States like Pennsylvania show higher cancer rates compared to states like New Mexico.
•	Demographic Insights: Racial and gender disparities in cancer rates highlight significant health inequalities.
•	Risk Factors: The analysis of tobacco use clearly links it to higher lung cancer rates, with smoking contributing to the majority of cases.
Future Work:
•	Extend the analysis to other chronic diseases.
•	Investigate the role of environmental pollution (e.g., "Cancer Alley" in Louisiana) in regional cancer rates.
•	Improve the visualization for better understanding of trends over time.

## Visualization by Leaflet
Three Leaflet visualizations were constructed:
* National level with cancer rates of 50 states visualized
* National level with lung cancer and smoking rates visualized
* State level (Florida) with lung cancer and smoking rates visualized
In order to display disease indicators and other variables on the national and state maps, those values had to be inserted into the properties of the GeoJSON files, using pandas. Preparation of the GeoJSON files and the ultimate graphing using Leaflet were performed within the `Leaflet_x` folders.

# Conclusion
The Chronic Disease Indicators allow for comparative analysis of a variety of disease measurements between states. However, due to the myriad factors impacting health and disease incidence, to even begin to draw correlations and conclusions regarding the causes or associations of disease, even more external data is needed.

With some easily-accessible data for just a few variables such as cigarette sales tax and poverty rate, we were able to verify the broad strokes of the landscape of lung cancer and smoking in the United States and in one state in particular (Florida). This suggests that even more convoluted and minute observations about disease incidence and association could be elucidated by following a similar method of plotting various socioeconomic factors versus the measurements found in the CDI.
