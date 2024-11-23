"use client"

import { useMemo } from 'react'
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MoodOverviewProps {
  moodData: { date: string; mood: number }[]
}

export default function MoodOverview({ moodData }: MoodOverviewProps) {
  const chartData = useMemo(() => {
    return moodData.slice(-30).map(({ date, mood }) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood
    }))
  }, [moodData])

  const averageMood = useMemo(() => {
    const sum = moodData.reduce((acc, { mood }) => acc + mood, 0)
    return sum / moodData.length
  }, [moodData])

  const moodPercentage = (averageMood / 10) * 100

  const trendPercentage = useMemo(() => {
    if (chartData.length < 2) return 0
    const firstMood = chartData[0].mood
    const lastMood = chartData[chartData.length - 1].mood
    return ((lastMood - firstMood) / firstMood) * 100
  }, [chartData])

  const chartConfig = {
    mood: {
      label: "Mood",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm border-indigo-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-indigo-100">Average Mood</h3>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-indigo-100">{averageMood.toFixed(1)}</span>
                <MoodSpeedDial percentage={moodPercentage} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm border-indigo-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-indigo-100">Mood Status</h3>
              <p className="text-2xl font-semibold text-indigo-100">
                {averageMood < 4 ? "Needs Improvement" :
                 averageMood < 7 ? "Doing Okay" : "Feeling Great!"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm border-indigo-700">
          <CardHeader>
            <CardTitle className="text-indigo-100">Mood Trend</CardTitle>
            <CardDescription className="text-indigo-200">
              Showing your mood trend for the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                  bottom: 12,
                }}
              >
                <CartesianGrid vertical={false} stroke="#6366f1" strokeOpacity={0.2} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                  stroke="#a5b4fc"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="#a5b4fc"
                  domain={[0, 10]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="#8b5cf6"
                  fill="url(#colorMood)"
                  fillOpacity={0.3}
                />
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none text-indigo-100">
                  {trendPercentage >= 0 ? (
                    <>
                      Trending up by {Math.abs(trendPercentage).toFixed(1)}% this month
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </>
                  ) : (
                    <>
                      Trending down by {Math.abs(trendPercentage).toFixed(1)}% this month
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 leading-none text-indigo-300">
                  Last 30 days
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </
div>
  )
}

function MoodSpeedDial({ percentage }: { percentage: number }) {
  const rotation = (percentage / 100) * 180 - 90

  return (
    <div className="relative w-24 h-12 overflow-hidden">
      <div className="absolute inset-0 bg-indigo-700 rounded-t-full"></div>
      <motion.div 
        className="absolute bottom-0 left-1/2 w-1 h-12 bg-pink-500 origin-bottom"
        initial={{ rotate: -90 }}
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 60, damping: 10 }}
      ></motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-indigo-100">{Math.round(percentage)}%</span>
      </div>
    </div>
  )
}

