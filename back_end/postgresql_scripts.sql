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