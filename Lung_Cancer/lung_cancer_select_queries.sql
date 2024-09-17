/* Select all data related to lung cancer */
SELECT *
FROM health_data_2023
WHERE "Question" LIKE 'Cancer of the lung%';

/* Identify all data sources used by lung cancer data */
SELECT DISTINCT("DataSource")
FROM health_data_2023
WHERE "Question" LIKE 'Cancer of the lung%';

/* Identify all data types used by lung cancer data */
SELECT DISTINCT("DataValueType")
FROM health_data_2023
WHERE "Question" LIKE 'Cancer of the lung%';

/* Identify all stratification categories used by lung cancer data */
SELECT DISTINCT("DataValueType")
FROM health_data_2023
WHERE "Question" LIKE 'Cancer of the lung%';