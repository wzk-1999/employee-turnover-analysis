const { Client } = require("pg");
require("dotenv").config();

const PhilanthroPanda = new Client({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: 5432,
});

PhilanthroPanda.connect((err) => {
  if (err) throw err;
  console.log("Connected to the PhilanthroPanda database!");
});

module.exports = PhilanthroPanda;
