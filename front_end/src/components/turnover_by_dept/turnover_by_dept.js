import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./turnover_by_dept.css"; // Make sure to import the CSS file

const Turnover_by_dept = () => {
  const [data, setData] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/department`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const columns = useMemo(
    () => [
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Number of leaving",
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

  return (
    <div className="container">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis domain={[yAxisMin, yAxisMax]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="staff_num" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <div className="chart-title">
          <strong>Turnover by Department</strong>
        </div>
      </div>
      <div className="table-container">
        <table {...getTableProps()} className="no-border-left-right">
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

export default Turnover_by_dept;
