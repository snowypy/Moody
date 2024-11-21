"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MoodInput from './MoodInput'
import MoodGauge from './MoodGauge'

export default function MoodTracker() {
  const [moodData, setMoodData] = useState<{ date: string; mood: number }[]>([])
  const [showInput, setShowInput] = useState(true)

  useEffect(() => {
    const storedMoodData = localStorage.getItem('moodData')
    if (storedMoodData) {
      setMoodData(JSON.parse(storedMoodData))
    }

    const today = new Date().toISOString().split('T')[0]
    const todayMood = moodData.find(data => data.date === today)
    if (todayMood) {
      setShowInput(false)
    }
  }, [])

  const handleMoodSubmit = (mood: number) => {
    const today = new Date().toISOString().split('T')[0]
    const newMoodData = [...moodData, { date: today, mood }]
    setMoodData(newMoodData)
    localStorage.setItem('moodData', JSON.stringify(newMoodData))
    setShowInput(false)
  }

  const averageMood = moodData.length > 0
    ? moodData.reduce((sum, data) => sum + data.mood, 0) / moodData.length
    : 0

  const moodPercentage = (averageMood / 10) * 100

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Grid background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Red glow effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500 rounded-full opacity-20 blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 container mx-auto p-4 flex flex-col items-center justify-center min-h-screen"
      >
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold mb-4 text-center font-roboto">
            <span className="bg-gradient-to-r from-red-500 to-red-800 text-transparent bg-clip-text">Moody</span> Tracker
          </h1>
          <p className="text-xl mb-8 text-center font-roboto">
            Track your daily mood with confidence. Our mood tracking tool helps you make informed decisions about your emotional well-being.
          </p>
          {showInput ? (
            <MoodInput onSubmit={handleMoodSubmit} />
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl mb-4 text-center font-roboto">Mood Overview</h2>
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-sm text-gray-400 font-roboto">Average Mood</p>
                  <p className="text-3xl font-bold font-roboto">{averageMood.toFixed(2)}</p>
                  <p className="text-sm text-gray-400 font-roboto">
                    {averageMood > 5 ? 'Positive trend' : 'Room for improvement'}
                  </p>
                </div>
                <MoodGauge percentage={moodPercentage} />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

