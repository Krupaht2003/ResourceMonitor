import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

function Speedometer({ value }) {
  const data = [
    { name: "Usage", value: value, fill: "#8884d8" },
    { name: "Max", value: 100, fill: "#ccc" }, // Represents full scale
  ];

  return (
    <RadialBarChart
      width={200}
      height={200}
      cx={100}
      cy={100}
      innerRadius={40}
      outerRadius={80}
      barSize={10}
      data={data}
    >
      <RadialBar minAngle={15} background clockWise dataKey="value" />
      <Tooltip />
      <Legend />
    </RadialBarChart>
  );
}

export default Speedometer;
