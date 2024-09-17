SELECT *
	FROM health_data_2023
	WHERE "Topic" = 'Disability'
	ORDER BY "StratificationCategory1" ASC, "LocationAbbr" ASC, "YearEnd" ASC;

SELECT "Topic", "Question", COUNT("Question") AS "Question Count"
FROM health_data_2023
WHERE "Topic" = 'Disability'
GROUP BY "Topic", "Question"
ORDER BY "Topic" ASC, "Question" ASC;