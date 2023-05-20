import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import "chartjs-adapter-moment";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { debounce } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale
);

// dummy data
// export const options = {
//   responsive: true,
//   interaction: {
//     mode: "index",
//     intersect: false,
//   },
//   stacked: false,
//   plugins: {
//     title: {
//       display: false,
//       //   text: "Chart.js Line Chart - Multi Axis",
//     },
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false, // Hide the vertical grid lines
//       },
//     },
//     y: {
//       type: "linear",
//       display: true,
//       position: "left",
//       ticks: {
//         fontSize: 20,
//       },
//     },
//     y1: {
//       type: "linear",
//       display: false,
//       position: "right",
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//   },
// };

// const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Guest",
//       data: labels.map(() => faker.datatype.number({ min: 100, max: 500 })),
//       borderColor: "#E9A0A0",
//       backgroundColor: "#E9A0A0",
//       yAxisID: "y",
//       lineTension: 0.4,
//       pointRadius: 0,
//     },
//     {
//       label: "User",
//       data: labels.map(() => faker.datatype.number({ min: 100, max: 500 })),
//       borderColor: "#9BDD7C",
//       backgroundColor: "#9BDD7C",
//       yAxisID: "y1",
//       lineTension: 0.4,
//       pointRadius: 0,
//     },
//   ],
// };

export function LineChart() {
  const [chartData, setChartData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-01-01&end=2022-12-31"
  //       );

  //       const data = response.data.bpi;

  //       const bitcoinData = {
  //         labels: Object.keys(data),
  //         datasets: [
  //           {
  //             label: "Bitcoin Price",
  //             data: Object.values(data),
  //             fill: false,
  //             borderColor: "rgba(255, 99, 132, 1)",
  //             yAxisID: "price-axis",
  //           },
  //         ],
  //       };

  //       setChartData(bitcoinData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   const debouncedFetchData = debounce(fetchData, 500);

  //   debouncedFetchData();

  //   return () => {
  //     // Clean up the debounce function
  //     debouncedFetchData.cancel();
  //   };
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bitcoinResponse = await axios.get(
          "https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-01-01&end=2022-12-31"
        );

        const ethereumResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1640995200&to=1672531199&interval=day"
        );

        const bitcoinData = formatBitcoinData(bitcoinResponse.data.bpi);
        const ethereumData = formatEthereumData(ethereumResponse.data.prices);

        const chartData = {
          labels: bitcoinData.labels,
          datasets: [
            {
              label: "Bitcoin Price",
              data: bitcoinData.prices,
              fill: false,
              borderColor: "#E9A0A0",
              backgroundColor: "#E9A0A0",
              yAxisID: "bitcoin-axis",
              lineTension: 0.4,
              pointRadius: 0,
              position: "right",
            },
            {
              label: "Ethereum Price",
              data: ethereumData.prices,
              fill: false,
              borderColor: "#9BDD7C",
              backgroundColor: "#9BDD7C",
              yAxisID: "ethereum-axis",
              lineTension: 0.4,
              pointRadius: 0,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const debouncedFetchData = debounce(fetchData, 500);

    debouncedFetchData();

    return () => {
      // Clean up the debounce function
      debouncedFetchData.cancel();
    };
  }, []);

  const formatBitcoinData = (data) => {
    const labels = Object.keys(data);
    const prices = Object.values(data);
    return { labels, prices };
  };

  const formatEthereumData = (data) => {
    const labels = data.map((entry) => new Date(entry[0]).toLocaleDateString());
    const prices = data.map((entry) => entry[1]);
    return { labels, prices };
  };

  console.log("lineChart", chartData);
  return (
    <div className="bg-[#fff] mt-[40px] p-[40px] rounded-3xl">
      <div>
        <h2 className="text-lg font-bold">Activities</h2>
        <button className="text-[#858585] text-sm">May - June 2021</button>
      </div>
      <div style={{ height: "400px" }}>
        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  align: "end",
                  // maxHeight: 100,
                  labels: {
                    color: "black", // Set the font color of the labels
                    position: "right",
                    pointStyle: "circle",
                    usePointStyle: true,
                    // useBorderRadius: true,

                    // pointStyleWidth: 20,
                    // borderRadius: 5,
                    padding: 10,

                    font: {
                      size: 13, // Set the font size of the labels
                    },
                  },
                  padding: {
                    top: 10,
                  },
                  // itemMargin: 10, // Set the vertical gap between labels
                },
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Date",
                  },
                  grid: { display: false },
                },
                "bitcoin-axis": {
                  type: "linear",
                  display: true,
                  position: "left",
                },
                "ethereum-axis": {
                  type: "linear",
                  display: true,
                  position: "right",
                  grid: {
                    drawOnChartArea: false,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
