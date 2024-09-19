/* Select all data related to tobacco */
SELECT *
FROM health_data_2023
WHERE "Topic" LIKE 'Tobacco';

/* Select all data related to cancer */
SELECT *
FROM health_data_2023
WHERE "Topic" LIKE 'Tobacco';

/* Identify all questions in topic */
SELECT DISTINCT("Question")
FROM health_data_2023
WHERE "Topic" LIKE 'Cancer';

/* Identify all data sources used by a single question */
SELECT DISTINCT("DataSource")
FROM health_data_2023
WHERE "Question" LIKE 'Current smoking among adults aged >= 18 years';

/* Identify all data types used by a single question */
SELECT DISTINCT("DataValueType")
FROM health_data_2023
WHERE "Question" LIKE 'Current cigarette smoking among youth';

/* Identify all stratification categories of a single question */
SELECT DISTINCT("StratificationCategory1", "Stratification1")
FROM health_data_2023
WHERE "Question" LIKE 'Current smoking among adults aged >= 18 years';

/* Select all data related to a single question */
SELECT *
FROM health_data_2023
WHERE "Question" LIKE 'Cigarette smoking before pregnancy'
AND "LocationAbbr" LIKE 'AK';

SELECT DISTINCT("Question", "StratificationCategory1")
FROM health_data_2023
WHERE "Topic" LIKE 'Tobacco'
AND "StratificationCategory1" = 'Overall';