"use client";

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const STAT = [
  {
    name: "Basic Tees",
    percentage: "55%",
    color: "#98D89E",
  },
  {
    name: "Custom Short Pants",
    percentage: "31%",
    color: "#EE8484",
  },
  {
    name: "Super Hoodies",
    percentage: "14%",
    color: "#F6DC7D",
  },
];

export const data = {
  //   labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      //   label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: ["#98D89E", "#EE8484", "#F6DC7D"],
      borderWidth: 0,
    },
  ],
};

export function PieChart() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 5,
              page: 1,
              sparkline: false,
            },
          }
        );

        const data = response.data.map((coin) => ({
          label: coin.name,
          data: coin.market_cap,
          backgroundColor: getRandomColor(),
        }));

        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="bg-[#fff] w-full mt-[40px] p-[30px] rounded-3xl h-[280px]">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Top Products</h1>
        <button className="text-[#858585] text-sm">May - June 2021</button>
      </div>
      <div className="pt-5">
        <div>
          {chartData ? (
            <Pie
              data={{
                labels: chartData.map((coin) => coin.label),
                datasets: [
                  {
                    data: chartData.map((coin) => coin.data),
                    backgroundColor: chartData.map(
                      (coin) => coin.backgroundColor
                    ),
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                    // maxHeight: 100,
                    labels: {
                      color: "black", // Set the font color of the labels
                      position: "right",
                      usePointStyle: true,
                      useBorderRadius: true,
                      padding: 20,
                      pointStyle: "circle",

                      font: {
                        size: 16, // Set the font size of the labels
                        weight: "bold", // Set the font weight of the labels
                      },
                    },
                    padding: {
                      top: 10,
                    },
                    // itemMargin: 10, // Set the vertical gap between labels
                  },
                },
              }}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {/* <div>
          <ul>
            {chartData.map((coin) => {
              return (
                <li
                  key={`${coin.label}-${coin.backgroundColor}`}
                  className="text-lg font-bold pt-3"
                >
                  <span
                    className={`w-10 h-10 inline-block bg-[${coin.backgroundColor}] rounded-full mr-4`}
                  >
                  </span>
                  {coin.label}
                </li>
              );
            })}
          </ul>
        </div> */}
      </div>
    </div>
  );
}
