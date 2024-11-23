"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MoodInput from './MoodInput'
import MoodOverview from './MoodOverview'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden relative"
    >
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:20px_34px]"></div>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full opacity-20 blur-[150px]"></div>
      </div>

      <div className="relative z-10 container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-5xl w-full">
          <motion.h1 
            className="text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-500"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Moody
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-center text-indigo-200"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Track your daily mood with confidence. Moody is made to help you motivate yourself!
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {showInput ? (
              <MoodInput onSubmit={handleMoodSubmit} />
            ) : (
              <Card className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm border-indigo-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-indigo-100">Mood Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <MoodOverview moodData={moodData} />
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

