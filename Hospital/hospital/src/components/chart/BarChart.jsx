import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.Condition),
        datasets: [
            {
                label: "Average Cost",
                data: data.map(d => d.Cost),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Average Cost per Condition" }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;
