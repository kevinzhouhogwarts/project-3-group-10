import plotly.express as px

# Assuming health_data_df is already loaded from a CSV file

# Filter the data for 'Cancer' in the 'Topic' column and exclude 'Invasive cancer (all sites combined), incidence'
filtered_df = health_data_df[
    (health_data_df['Topic'] == 'Cancer') &
    (health_data_df['Question'] != 'Invasive cancer (all sites combined), incidence')
]

# Dictionary to map state names to abbreviations
state_abbrev = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI',
    'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
    'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
    'Wisconsin': 'WI', 'Wyoming': 'WY'
}

# Map full state names to abbreviations in your DataFrame
filtered_df['StateAbbrev'] = filtered_df['LocationDesc'].map(state_abbrev)

# Drop rows with missing state abbreviations if any
filtered_df = filtered_df.dropna(subset=['StateAbbrev'])

# Create a choropleth map using the state abbreviations
fig = px.choropleth(filtered_df,
                    locations='StateAbbrev',  # Use the new column with state abbreviations
                    locationmode='USA-states',  # Match state abbreviations
                    color='DataValue',  # Data to color code by
                    hover_name='LocationDesc',  # Info on hover
                    color_continuous_scale='Greens',  # Color scale
                    scope='usa',  # Limit map to USA
                    labels={'DataValue': 'Cancer Population per 100,000 People'}  # Label for color bar
                   )

# Add title
fig.update_layout(title_text='Cancer Population by State in the U.S.', geo_scope='usa')

# Show the figure
fig.show()