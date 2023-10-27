import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardTitle, CardContent } from "../ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
      display: false,
    },
    title: {},
  },
  scales: {
    x: {
      border: {
        display: false,
        dash: [2, 4],
      },
      grid: {
        display: true,
        color: "#E7E7E7",
        borderDash: [30, 15],
        borderColor: "white",
      },
      title: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      title: {
        display: false,
        color: "green",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
  },
} as ChartOptions;

const labels = [
  "In Use",
  "Out for Maintanance",
  "Transferred Out",
  "Damaged",
  "Disposed",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1500, 500, 600, 6000, 8000, 500],
      borderColor: "transparent",
      backgroundColor: "#FF564F",
      borderWidth: 2,
      borderRadius: 10,
      barPercentage: 0.5,
    },
  ],
} as ChartData;

export function AssetCountByStatusWidget() {
  return (
    <Card className="p-5">
      <CardTitle>Asset Count by Status</CardTitle>
      <CardContent>
        {/* @ts-ignore */}
        <Bar className="h-24" options={options} data={data} />
      </CardContent>
    </Card>
  );
}
