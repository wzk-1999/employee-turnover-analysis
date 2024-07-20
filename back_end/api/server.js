// server.js

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001; // Change the port if necessary

const db = require("../repository/db");
app.use(cors()); // Enable CORS
app.get("/api/department", async (req, res) => {
  try {
    const turnover_by_dept =
      await db.query(`SELECT department,count(staff_id) staff_num 
      FROM staff_data group by department`);
    res.json(turnover_by_dept.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch turnover_by_dept" });
  }
});

app.get("/api/age", async (req, res) => {
  try {
    const turnover_by_age =
      await db.query(`select concat(5*(sd."Age_of_leaving_job"/5),'-',5*(sd."Age_of_leaving_job"/5)+4) "age range"
,count(staff_id) staff_num from staff_data sd 
group by sd."Age_of_leaving_job"/5`);
    res.json(turnover_by_age.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch turnover_by_age" });
  }
});

app.get("/api/month", async (req, res) => {
  try {
    const turnover_by_month =
      await db.query(`select left("Time_of_leaving",7) month_of_leaving
		,count(staff_id) staff_num
      from 
      staff_data sd 
      group by left("Time_of_leaving",7)
      order by left("Time_of_leaving",7)`);
    res.json(turnover_by_month.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch turnover_by_month" });
  }
});

app.get("/api/pivot", async (req, res) => {
  try {
    const turnover_pivot = await db.query(`select if_internal_referance 
		,highest_education 
		,"Reason_for_leaving" 
		,if_change_career 
		,"Rank"
		,count(staff_id) staff_num
from staff_data sd 
group by if_internal_referance 
		,highest_education 
		,"Reason_for_leaving" 
		,if_change_career 
		,"Rank" `);
    res.json(turnover_pivot.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch turnover_pivot" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
