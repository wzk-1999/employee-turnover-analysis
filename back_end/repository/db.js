const { Client } = require("pg");
require("dotenv").config();

const PhilanthroPanda = new Client({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port || 5432,
  ssl: {
    rejectUnauthorized: false, // this setting is super important: or it will error like Connection error Error:
    // read ECONNRESET at TCP.onStreamRead (node:internal/stream_base_commons:217:20)
  },
});

PhilanthroPanda.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the PhilanthroPanda database!");
  }
});

module.exports = PhilanthroPanda;
