import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Chart from "chart.js/auto";

function ChartPage() {
  const [data, setData] = useState([
    { team: "First", score: 10 },
    { team: "Second", score: 3 },
    { team: "Third", score: 31 },
    { team: "Fourth", score: 18 },
  ]);

  const colors = ["#0C2340", "#0A2355", "#06268A", "#042B96"];

  function BarChart(scores) {
    Chart.defaults.font.size = 14;
    Chart.defaults.color = "black";
    new Chart(document.getElementById("barChart"), {
      type: "bar",
      options: {
        animation: true,
        scales: {
          x: {
            grid: {
              color: "black",
            },
          },
          y: {
            grid: {
              color: "black",
            },
          },
        },
      },
      data: {
        labels: scores.map((row) => row.team),
        datasets: [
          {
            label: "Points Scored",
            data: scores.map((row) => row.score),
            backgroundColor: colors,
            borderColor: "black",
            borderWidth: 5,
          },
        ],
      },
    });
  }

  function LineChart() {
    const timeLabels = Array.from({ length: 10 }, (_, i) => `T${i + 1}`);
    const randomScores = Array.from({ length: 10 }, () => Math.floor(Math.random() * 50));

    new Chart(document.getElementById("lineChart"), {
      type: "line",
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
              color: "black",
            },
          },
          y: {
            title: {
              display: true,
              text: "Score",
              color: "black",
            },
            min: 0,
            max: 50,
          },
        },
      },
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: "Score Over Time",
            data: randomScores,
            borderColor: "#06268A",
            backgroundColor: "rgba(6, 38, 138, 0.3)",
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: "#042B96",
          },
        ],
      },
    });
  }

  useEffect(() => {
    BarChart(data);
    LineChart();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <canvas id="barChart" />
        <canvas id="lineChart" />
      </div>
    </div>
  );
}

export default ChartPage;
