import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Chart from "chart.js/auto";
import { Colors } from "chart.js";

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

  useEffect(() => {
    // Example: Fetch teams from backend
    //fetchTeams();
    // Example: Fetch current scores from backend
    //fetchScores();
    console.log("Hi");
    BarChart(data);
    var mean = 0;
    data.map((el) => {
      mean += el.score;
    });
    mean = mean / data.length;
    console.log(mean);
  }, [100]);

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
