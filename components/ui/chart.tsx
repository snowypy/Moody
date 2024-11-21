import * as React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface ChartProps {
  data: { name: string; value: number }[];
  colors: string[];
}

const Chart: React.FC<ChartProps> = ({ data, colors }) => {
  return (
    <div className="chart-container">
      <PieChart width={160} height={160}>
        <Pie
          data={data}
          cx={80}
          cy={80}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
      <style jsx>{`
        .chart-container {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default Chart;