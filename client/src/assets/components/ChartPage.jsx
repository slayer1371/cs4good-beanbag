import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Chart from "chart.js/auto";
import { Colors } from "chart.js";

function ChartPage() {
  const [data, setData] = useState([
    { team: "First", score: [0, 0, 0, 0] },
    { team: "Second", score: [1, 0, 5, 0] },
    { team: "Third", score: [0, 0, 0, 0] },
    { team: "Fourth", score: [0, 0, 4, 0] },
  ]);
  const [mean, setMean] = useState([]);
  const colors = ["#0C2340", "#0A2355", "#06268A", "#042B96"];
  var i = 0;
  var bar;
  useEffect(() => {
    function RandomInt() {
      var int = Math.floor(Math.random() * 10);
      return int;
    }
    setInterval(() => {
      setData([
        { team: "First", score: [RandomInt(), 0, 0, RandomInt()] },
        { team: "Second", score: [1, 0, 5, 0] },
        { team: "Third", score: [RandomInt(), 0, RandomInt(), 0] },
        { team: "Fourth", score: [RandomInt(), RandomInt(), 4, 0] },
      ]);
    }, 5000);
  }, [0]);
  useEffect(() => {
    console.log(mean);
    console.log(mean.map((row) => row));
    Chart.defaults.font.size = 14;
    Chart.defaults.color = "black";

    new Chart(barChart, {
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
        labels: data.map((row) => row.team),
        datasets: [
          {
            label: "Points Scored",
            data: mean.map((row) => row),
            backgroundColor: colors,
            borderColor: "black",
            borderWidth: 5,
          },
        ],
      },
    });
  }, [mean]);

  useEffect(() => {
    Chart.getChart("barChart").destroy();
    setMean([]);
    // Example: Fetch teams from backend
    //fetchTeams();
    // Example: Fetch current scores from backend
    //fetchScores();
    console.log("Hi");
    var finalmean = [];
    data.map((el) => {
      var localmean = 0;
      console.log(el.score);
      el.score.map((val) => {
        localmean += val;
      });
      localmean = localmean / el.score.length;
      finalmean.push(localmean);
      console.log(localmean);
      setMean([...finalmean, finalmean[-1]]);
    });
  }, [data]);

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
