import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
    const sortedData = [...data].sort((a, b) => a.Length_of_Stay - b.Length_of_Stay);

    const chartData = {
        labels: sortedData.map(d => `Stay ${d.Length_of_Stay} days`),
        datasets: [
            {
                label: "Cost over Length of Stay",
                data: sortedData.map(d => d.Cost),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Cost Trend over Length of Stay" }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;
