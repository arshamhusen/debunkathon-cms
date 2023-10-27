import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Bar } from "react-chartjs-2";

export default function AssetInactivityWidget() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1500, 500, 600, 6000, 8000, 500],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Card className="lg:p-5">
      <CardTitle>Asset Inactivity Periods</CardTitle>
      <CardContent>
        {/* @ts-ignore */}
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  );
}
