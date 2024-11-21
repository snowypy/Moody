"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Slider from "@/components/ui/slider"

interface MoodInputProps {
  onSubmit: (mood: number) => void
}

const moodEmojis = ['😭', '😢', '☹️', '😕', '😐', '🙂', '😊', '😄', '😁', '🥳']

export default function MoodInput({ onSubmit }: MoodInputProps) {
  const [mood, setMood] = useState(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(mood)
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl mb-6 text-center font-roboto">How are you feeling today?</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="text-center">
          <motion.div
            key={mood}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-7xl mb-4"
          >
            {moodEmojis[mood - 1]}
          </motion.div>
          <p className="text-xl font-semibold font-roboto">
            {mood === 1 ? "Terrible" : 
             mood === 2 ? "Very Bad" :
             mood === 3 ? "Bad" :
             mood === 4 ? "Not Good" :
             mood === 5 ? "Okay" :
             mood === 6 ? "Fine" :
             mood === 7 ? "Good" :
             mood === 8 ? "Very Good" :
             mood === 9 ? "Great" : "Excellent"}
          </p>
        </div>
        <Slider
          min={1}
          max={10}
          step={1}
          value={[mood]}
          onValueChange={(value) => setMood(value[0])}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-400">
          <span className="font-roboto">Terrible</span>
          <span className="font-roboto">Excellent</span>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out font-roboto shadow-glow"
        >
          Submit Your Mood
        </motion.button>
      </form>
    </motion.div>
  )
}

