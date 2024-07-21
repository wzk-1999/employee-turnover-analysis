-- public.staff_data definition

-- Drop table

-- DROP TABLE public.staff_data;

CREATE TABLE public.staff_data (
	staff_id varchar(50) NULL,
	department varchar(50) NULL,
	"Age_of_leaving_job" int4 NULL,
	if_internal_referance bool NULL,
	highest_education varchar(50) NULL,
	"Reason_for_leaving" varchar(50) NULL,
	"Time_of_leaving" varchar(50) NULL,
	if_change_career varchar(50) NULL,
	"Rank" varchar(50) NULL
);

-- Permissions

ALTER TABLE public.staff_data OWNER TO postgres;
GRANT ALL ON TABLE public.staff_data TO postgres;

-- Step 1: Create a sequence for the new staff_id values
CREATE SEQUENCE staff_id_seq START 3000001;

-- Step 2: Use a Cartesian product to generate the required number of duplicates and insert them
WITH duplicate_data AS (
    SELECT
        nextval('staff_id_seq') AS new_id,
        staff_id,
        department,
        "Age_of_leaving_job",
        if_internal_referance,
        highest_education,
        "Reason_for_leaving",
        "Time_of_leaving",
        if_change_career,
        "Rank"
    FROM
        public.staff_data,
        generate_series(1, 9) AS gs
)
INSERT INTO public.staff_data ("staff_id", "department", "Age_of_leaving_job", "if_internal_referance", "highest_education", "Reason_for_leaving", "Time_of_leaving", "if_change_career", "Rank")
SELECT
    'TB' || TO_CHAR(new_id, 'FM0000000') AS staff_id,
    department,
    "Age_of_leaving_job",
    if_internal_referance,
    highest_education,
    "Reason_for_leaving",
    "Time_of_leaving",
    if_change_career,
    "Rank"
FROM
    duplicate_data;

