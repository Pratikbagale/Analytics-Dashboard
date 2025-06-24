import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const conditionCounts = data.reduce((acc, patient) => {
        acc[patient.Condition] = (acc[patient.Condition] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(conditionCounts),
        datasets: [
            {
                label: "Patients per Condition",
                data: Object.values(conditionCounts),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)"
                ],
                borderWidth: 1
            }
        ]
    };

    return <Pie data={chartData} />;
};

export default PieChart;
