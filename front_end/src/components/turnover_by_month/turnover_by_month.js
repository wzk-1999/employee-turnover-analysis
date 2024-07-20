import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./turnover_by_month.css"; // Make sure to import the CSS file

const Turnover_by_month = () => {
  const [data, setData] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/month`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // console.log(`${API_BASE_URL}/api/month`);
        // console.log(`${process.env.REACT_APP_API_BASE_URL}`);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const columns = useMemo(
    () => [
      {
        Header: "Month of Leaving",
        accessor: "month_of_leaving",
      },
      {
        Header: "Number of Leaving",
        accessor: "staff_num",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // Calculate min and max values for YAxis
  const staffNums = data.map((item) => parseInt(item.staff_num, 10));
  const minValue = Math.min(...staffNums);
  const maxValue = Math.max(...staffNums);
  const range = maxValue - minValue;
  const yAxisMin = minValue - range * 0.2;
  const yAxisMax = maxValue + range * 0.2;

  // Format data for Line Chart
  const formattedData = data.map((item) => ({
    month: item["month_of_leaving"].slice(2).replace("-", "/"),
    staff_num: parseInt(item.staff_num, 10),
  }));

  return (
    <div className="container">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[yAxisMin, yAxisMax]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="staff_num"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="chart-title">
          <strong>Turnover by Month</strong>
        </div>
      </div>
      <div className="table-container">
        <table {...getTableProps()} className="orange-striped-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Turnover_by_month;
