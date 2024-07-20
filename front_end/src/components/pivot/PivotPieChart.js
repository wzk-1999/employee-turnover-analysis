import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DraggableItem = ({ name, type, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(item.name, dropResult.type);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "5px 10px",
        border: "1px solid gray",
        marginRight: "10px",
        cursor: "move",
      }}
    >
      {name}
    </div>
  );
};

const DropZone = ({ type, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "dimension",
    drop: () => ({ type }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "lightgreen" : "white",
        width: "200px", // Adjust the width as needed
        height: "100px", // Adjust the height as needed
        border: "1px dashed gray",
        padding: "10px",
        marginLeft: "10px",
      }}
    >
      {children}
    </div>
  );
};

const PivotPieChart = () => {
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [activeDimension, setActiveDimension] = useState("Reason_for_leaving");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/api/pivot");
        setData(response.data);
        const options = {};
        response.data.forEach((item) => {
          Object.keys(item).forEach((key) => {
            if (key !== "staff_num") {
              if (!options[key]) {
                options[key] = new Set();
              }
              options[key].add(item[key]);
            }
          });
        });
        setFilterOptions(options);
        // Initialize selectedFilters with all options
        const initialFilters = {};
        for (const key in options) {
          initialFilters[key] = Array.from(options[key]);
        }
        setSelectedFilters(initialFilters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDrop = (dimension, type) => {
    if (type === "dimension") {
      setActiveDimension(dimension);
    }
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[key]) {
        if (newFilters[key].includes(value)) {
          newFilters[key] = newFilters[key].filter((v) => v !== value);
          if (newFilters[key].length === 0) {
            delete newFilters[key];
          }
        } else {
          newFilters[key].push(value);
        }
      } else {
        newFilters[key] = [value];
      }
      return newFilters;
    });
  };

  const handleSelectAllChange = (key, allSelected) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (allSelected) {
        delete newFilters[key];
      } else {
        newFilters[key] = Array.from(filterOptions[key]);
      }
      return newFilters;
    });
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.keys(selectedFilters).every((key) => {
        return selectedFilters[key].includes(item[key]);
      });
    });
  }, [data, selectedFilters]);

  const chartData = useMemo(() => {
    const groupedData = filteredData.reduce((acc, item) => {
      const key = item[activeDimension];
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += parseInt(item.staff_num, 10);
      return acc;
    }, {});

    return Object.keys(groupedData).map((key) => ({
      name: key,
      value: groupedData[key],
    }));
  }, [filteredData, activeDimension]);

  const renderFilter = (key) => {
    const allSelected =
      selectedFilters[key]?.length === filterOptions[key]?.size;
    return (
      <div key={key} style={{ marginBottom: "20px" }}>
        <h4>{key}</h4>
        <div>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => handleSelectAllChange(key, allSelected)}
          />
          <label>Select All</label>
        </div>
        {Array.from(filterOptions[key] || []).map((value) => (
          <div key={value}>
            <input
              type="checkbox"
              checked={
                selectedFilters[key] && selectedFilters[key].includes(value)
              }
              onChange={() => handleFilterChange(key, value)}
            />
            <label>{String(value)}</label> {/* Convert value to string */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          height: "100vh", // Full viewport height
        }}
      >
        <div
          style={{
            width: "60%", // Adjust width as needed
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
              }}
            >
              {[
                "if_internal_referance",
                "highest_education",
                "Reason_for_leaving",
                "if_change_career",
                "Rank",
              ].map((dim) => (
                <DraggableItem
                  key={dim}
                  name={dim}
                  type="dimension"
                  onDrop={handleDrop}
                />
              ))}
            </div>
            <DropZone type="dimension" onDrop={handleDrop}>
              <h3>Drag a dimension here</h3>
              <div>{activeDimension}</div>
            </DropZone>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 1, paddingRight: "10px" }}>
              {renderFilter("if_internal_referance")}
            </div>
            <div style={{ flex: 1, paddingLeft: "10px" }}>
              {renderFilter("highest_education")}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 1, paddingRight: "10px" }}>
              {renderFilter("Reason_for_leaving")}
            </div>
            <div style={{ flex: 1, paddingLeft: "10px" }}>
              {renderFilter("if_change_career")}
            </div>
          </div>
          <div>{renderFilter("Rank")}</div>
        </div>
        <div
          style={{
            width: "40%", // Adjust width as needed
            padding: "20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DndProvider>
  );
};

export default PivotPieChart;
