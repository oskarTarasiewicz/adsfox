import React from "react";
import { Chart } from "react-google-charts";

interface Channel {
  name: string;
  amount: string;
}

interface PieChartProps {
  data: Channel[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = [
    ['name', 'amount'],
    ...data.map((channel) => [channel.name, parseInt(channel.amount)]),
  ];

  return (
    <Chart
      className="w-full"
      chartType="PieChart"
      data={chartData}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default PieChart;
