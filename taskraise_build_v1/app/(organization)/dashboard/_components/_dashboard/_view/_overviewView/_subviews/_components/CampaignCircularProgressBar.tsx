import React from "react";
import {
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import { Tables } from "@/types/supabase"; // Assuming you have a type definition

export default function CampaignCircularProgressBar({
  campaign,
}: {
  campaign: Tables<"campaigns"> | null;
}) {
  const raised = campaign?.raised ?? 0;
  const goal = campaign?.goal ?? 0;
  const title = campaign?.title ?? "Start a fundraising campaign!";

  // Calculate percentage, ensuring it's capped at 100
  let percentage = campaign && goal > 0 ? (raised / goal) * 100 : 0;
  percentage = Math.min(percentage, 100); // Cap at 100%
  const data = [{ name: "L1", value: percentage }];

  // Change color to green when percentage reaches 100
  const barColor = percentage >= 100 ? "#28a745" : "#645CFF";

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
            fill={barColor}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-semibold text-xl"
          >
            {percentage.toFixed(0)}%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center space-y-2">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          ${raised.toLocaleString()} out of ${goal.toLocaleString()}
        </p>
      </div>
    </>
  );
}
