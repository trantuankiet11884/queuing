import React from "react";
import ReactApexChart from "react-apexcharts";
interface AreaChartProps {
  data: { x: string; y: number }[];
}

const ChartPage: React.FC<AreaChartProps> = ({ data }) => {
  const options = {
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: data.map((item) => item.x),
    },
  };

  const series = [
    {
      name: "Series 1",
      data: data.map((item) => item.y),
    },
  ];
  return <div>
     <ReactApexChart options={options} series={series} type="area" height={350} />
  </div>;
};

export default ChartPage;
