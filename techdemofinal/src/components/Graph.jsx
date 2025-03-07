import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Graph({ data }) {
  const formattedData = data.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    cpu_usage: item.cpu_usage,
    memory_usage: item.memory_usage,
    disk_usage: item.disk_usage,
  }));

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded">
      <h3 className="text-lg font-semibold">Historical Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cpu_usage" stroke="#ff7300" />
          <Line type="monotone" dataKey="memory_usage" stroke="#387908" />
          <Line type="monotone" dataKey="disk_usage" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
