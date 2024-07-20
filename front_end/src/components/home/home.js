import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Import CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <Link to="/turnover_by_dept" className="card card-1">
        <h3>Turnover by Department</h3>
      </Link>
      <Link to="/turnover_by_age" className="card card-2">
        <h3>Turnover by Age</h3>
      </Link>
      <Link to="/turnover_by_month" className="card card-3">
        <h3>Turnover by Month</h3>
      </Link>
      <Link to="/pivot" className="card card-4">
        <h3>Pivot Chart</h3>
      </Link>
    </div>
  );
};

export default Home;
