import React, { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Chart from "chart.js/auto";
import axios from "axios";

function ChartPage() {
  const [data, setData] = useState([]);
  const chartRefs = useRef([]);
  const colors = ["#0C2340", "#0A2355", "#06268A", "#042B96"];

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://cs4good-beanbag-codt.onrender.com/get_scores");
        if (response.data) {
          console.log(response.data);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
    const interval = setInterval(getData, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Chart.defaults.font.size = 14;
    Chart.defaults.color = "black";

    // Destroy existing charts before recreating
    chartRefs.current.forEach((chart) => {
      if (chart) chart.destroy();
    });

    // Find the maximum Y-axis value across all datasets
    const maxY = Math.max(
      ...data.flatMap((team) => team.freq),
      10 // Ensure a reasonable minimum
    );

    // Plugin for drawing the red arrow at the mean position
    const meanArrowPlugin = {
      id: "meanArrow",
      afterDatasetsDraw(chart) {
        const { ctx, scales } = chart;
        // Since each chart has one dataset, get it directly:
        const dataset = chart.data.datasets[0];
        const mean = dataset.mean;
        if (mean === undefined) return;

        const xPosition = scales.x.getPixelForValue(mean);
        const yPosition = scales.y.bottom + 10; // Below the X-axis

        ctx.save();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(xPosition, yPosition);
        ctx.lineTo(xPosition - 5, yPosition + 10);
        ctx.lineTo(xPosition + 5, yPosition + 10);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      },
    };

    // Plugin for drawing the green standard deviation bar
    const stdvBarPlugin = {
      id: "stdvBar",
      afterDatasetsDraw(chart) {
        const { ctx, scales } = chart;
        const dataset = chart.data.datasets[0];
        const mean = dataset.mean;
        const stdv = dataset.stdv;
        if (mean === undefined || stdv === undefined) return;

        // Calculate left and right x positions using the mean and stdv
        const xLeft = scales.x.getPixelForValue(mean - stdv);
        const xRight = scales.x.getPixelForValue(mean + stdv);
        const width = xRight - xLeft;
        const yPosition = scales.y.bottom; // Align with x-axis

        ctx.save();
        ctx.fillStyle = "green";
        ctx.fillRect(xLeft, yPosition, width, 10); // Draw a 10px tall bar
        ctx.restore();
      },
    };

    // Register plugins globally
    Chart.register(meanArrowPlugin);
    Chart.register(stdvBarPlugin);

    // Create new charts. Here, embed mean and stdv directly into the dataset.
    chartRefs.current = data.map((el, index) => {
      const ctx = document.getElementById(`chart-${index}`);
      if (!ctx) return null;

      return new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Ring 0", "Ring 1", "Ring 2", "Ring 3", "Ring 4", "Ring 5"],
          datasets: [
            {
              label: "Frequency",
              data: el.freq,
              backgroundColor: colors,
              borderColor: "black",
              borderWidth: 2,
              // Embed the specific mean and stdv for this chart
              mean: el.mean,
              stdv: el.stdv,
            },
          ],
        },
        options: {
          animation: false,
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              min: 0,
              max: maxY,
              ticks: {
                stepSize: Math.ceil(maxY / 5),
              },
              grid: { color: "black" },
            },
            x: {
              grid: { color: "black" },
            },
          },
        },
        plugins: [meanArrowPlugin, stdvBarPlugin],
      });
    });

    return () => {
      chartRefs.current.forEach((chart) => {
        if (chart) chart.destroy();
      });
    };
  }, [data]);

  return (
    <div className="chart-page-container">
      <NavBar />
      <div className="chart-container">
        {data.map((el, index) => (
          <div key={index}>
            <h1>{el.team}</h1>
            <div className="barChart">
              <canvas id={`chart-${index}`} />
            </div>
            <div className="stats">
              <h2>Average: {(el.mean).toFixed(2)}</h2>
              <h2>Spread: {(el.stdv).toFixed(2)}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartPage;
