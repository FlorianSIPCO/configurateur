"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const filters = ["semaine", "mois", "année"] as const;
type Filter = typeof filters[number];

export default function LeadsChart() {
  const [filter, setFilter] = useState<Filter>("mois");
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/dashboard/stats/leads?filter=${filter}`)
      .then(res => res.json())
      .then(data => {
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Nouveaux leads",
              data: data.values,
              fill: false,
              borderColor: "#f59e0b",
              backgroundColor: "#f59e0b",
              tension: 0.4,
            }
          ]
        });
      });
  }, [filter]);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-10">
      <div className="flex justify-between items-center flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-amber-700">Évolution des leads</h2>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg ${
                filter === f ? "bg-amber-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                enabled: true
              },
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }}
        />
      ) : (
        <p className="text-center text-gray-500">Chargement du graphique...</p>
      )}
    </div>
  );
}
