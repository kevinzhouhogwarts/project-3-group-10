/* Select all data related to tobacco */
SELECT *
FROM health_data_2023
WHERE "Topic" LIKE 'Tobacco';

/* Identify all questions in topic */
SELECT DISTINCT("Question")
FROM health_data_2023
WHERE "Topic" LIKE 'Tobacco';

/* Identify all data sources used by a single question */
SELECT DISTINCT("DataSource")
FROM health_data_2023
WHERE "Question" LIKE 'Current smoking among adults aged >= 18 years';

/* Identify all data types used by a single question */
SELECT DISTINCT("DataValueType")
FROM health_data_2023
WHERE "Question" LIKE 'Current smoking among adults aged >= 18 years';

/* Identify all stratification categories of a single question */
SELECT DISTINCT("StratificationCategory1", "Stratification1")
FROM health_data_2023
WHERE "Question" LIKE 'Current smoking among adults aged >= 18 years';

/* Select all data related to a single question */
SELECT *
FROM health_data_2023
WHERE "Question" = 'Current smokeless tobacco use among adults aged >= 18 years'
AND "YearStart" = '2011'
AND "LocationAbbr" = 'MI'
AND "DataValueType" = 'Age-adjusted Prevalence';