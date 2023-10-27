import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Doughnut } from "react-chartjs-2";

export default function AssetBreakdownWidget() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data: ChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: false,
      },
    },
  } as ChartOptions;

  return (
    <Card className="p-5">
      <CardTitle>Asset Breakdown</CardTitle>
      <CardContent className=" flex justify-center items-center w-full">
        {/* @ts-ignore */}
        <Doughnut className="w-full h-full" options={options} data={data} />
      </CardContent>
    </Card>
  );
}
