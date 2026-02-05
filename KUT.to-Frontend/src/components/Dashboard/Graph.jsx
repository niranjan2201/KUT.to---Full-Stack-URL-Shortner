import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  // Only use real data if it exists and has length > 0
  const hasRealData = graphData && graphData.length > 0;
  
  const labels = hasRealData ? graphData.map((item) => {
    const date = new Date(item.clickDate);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }) : ["", "", "", "", "", "", ""];
  
  const userPerDaya = hasRealData ? graphData.map((item) => item.count) : [0, 0, 0, 0, 0, 0, 0];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Clicks",
        data: userPerDaya,
        backgroundColor: "#3b82f6",
        borderColor: "#1D2327",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: hasRealData, // Only show legend when there's real data
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: hasRealData, // Only show grid lines when there's real data
        },
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: hasRealData, // Only show grid lines when there's real data
        },
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
    },
  };

  return <Bar className=" w-full" data={data} options={options}></Bar>;
};

export default Graph;