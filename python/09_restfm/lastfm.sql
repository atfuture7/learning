/*
	20200403 
	create a table to store the result of REST API
*/
CREATE TABLE IF NOT EXISTS fmDump (
	id integer PRIMARY KEY,	
	jsonData TEXT,
	act_type int,	/* which action calls for pulling data */
	create_at TEXT DEFAULT CURRENT_TIMESTAMP
);