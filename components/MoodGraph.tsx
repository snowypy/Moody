"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface MoodGraphProps {
  moodData: { date: string; mood: number }[]
}

export default function MoodGraph({ moodData }: MoodGraphProps) {
  const chartRef = useRef<ChartJS<'line'>>(null)

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.canvas.style.height = '400px'
    }
  }, [])

  const data = {
    labels: moodData.map(data => data.date),
    datasets: [
      {
        label: 'Mood',
        data: moodData.map(data => data.mood),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  }

  const averageMood = moodData.reduce((sum, data) => sum + data.mood, 0) / moodData.length

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl mb-4">Your Mood Over Time</h2>
      <div className="h-[400px]">
        <Line ref={chartRef} data={data} options={options} />
      </div>
      <div className="mt-4 text-center">
        <p className="text-xl">Average Mood: {averageMood.toFixed(1)} / 10</p>
      </div>
    </motion.div>
  )
}

