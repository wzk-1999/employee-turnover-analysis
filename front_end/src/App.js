import TurnoverByDept from "./components/turnover_by_dept/turnover_by_dept";
import Turnover_by_age from "./components/turnover_by_age/turnover_by_age";
import Home from "./components/home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/header"; // Assuming you have a Header component
import Turnover_by_month from "./components/turnover_by_month/turnover_by_month";
import PivotPieChart from "./components/pivot/PivotPieChart";

function Turnover() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/turnover_by_dept" element={<TurnoverByDept />} />
        <Route path="/turnover_by_age" element={<Turnover_by_age />} />
        <Route path="/turnover_by_month" element={<Turnover_by_month />} />
        <Route path="/pivot" element={<PivotPieChart />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default Turnover;
