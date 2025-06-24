import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import "./Top5Countries.css"; // Import CSS file

const Top5Countries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/top5countries")
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="top5-container">
      <h2>Top 5 COVID-19 Affected Countries</h2>

      {loading ? (
        <p className="loading-text">Loading data...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300} >
            <BarChart data={data} margin={{ top: 20, right: 30, left: 70, bottom: 5 }}>
              <XAxis dataKey="Country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="TotalCases" fill="#ff4d4d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Top5Countries;
