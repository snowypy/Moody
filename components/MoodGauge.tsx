import * as React from "react";
import Chart from "./ui/chart";

interface MoodGaugeProps {
  percentage: number;
}

export default function MoodGauge({ percentage }: MoodGaugeProps) {
  const data = [
    { name: "Mood", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const colors = ["var(--color-mood)", "#444444"];

  return (
    <div className="w-40 h-40">
      <Chart data={data} colors={colors} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold font-roboto">{Math.round(percentage)}%</span>
      </div>
      <style jsx>{`
        .absolute {
          position: absolute;
        }
        .inset-0 {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .flex {
          display: flex;
        }
        .items-center {
          align-items: center;
        }
        .justify-center {
          justify-content: center;
        }
        .text-2xl {
          font-size: 1.5rem;
        }
        .font-bold {
          font-weight: bold;
        }
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </div>
  );
}