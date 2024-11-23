"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MoodGraphProps {
  moodData: { date: string; mood: number }[]
}

export default function MoodGraph({ moodData }: MoodGraphProps) {
  const chartData = moodData.map(({ date, mood }) => ({
    date: new Date(date).toLocaleDateString(),
    mood
  }))

  return (
    <ChartContainer
      config={{
        mood: {
          label: "Mood",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 10]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="mood" stroke="var(--color-mood)" name="Mood" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
