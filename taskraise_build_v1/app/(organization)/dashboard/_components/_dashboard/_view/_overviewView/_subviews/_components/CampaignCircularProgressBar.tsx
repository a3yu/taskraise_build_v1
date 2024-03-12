import React from "react";
import {
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [{ name: "L1", value: 25 }];

export default function CampaignCircularProgressBar() {
  return (
    <>
      <ResponsiveContainer width="100%" height={180}>
        <RadialBarChart
          className="mx-auto my-auto"
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="100%"
          barSize={50}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius="50%"
            fill="#645CFF"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-semibold text-xl"
          >
            {data[0].value}%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center space-y-2">
        <h2 className="font-semibold">FRC Worlds</h2>
        <p className="text-sm text-muted-foreground">$200 out of $800</p>
      </div>
    </>
  );
}
