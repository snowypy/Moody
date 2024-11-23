"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Card className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm border-indigo-700">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-indigo-100">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
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
            <motion.p 
              className="text-xl font-semibold text-indigo-100"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {mood === 1 ? "Bloomin Awful" : 
               mood === 2 ? "Awful" :
               mood === 3 ? "Bad" :
               mood === 4 ? "Meh" :
               mood === 5 ? "Mid Berry" :
               mood === 6 ? "Chillin" :
               mood === 7 ? "Loungin" :
               mood === 8 ? "Sweet" :
               mood === 9 ? "Flipping" : "Sweet"} 
            </motion.p>
          </div>
          <Slider
            min={1}
            max={10}
            step={1}
            value={[mood]}
            onValueChange={(value) => setMood(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-indigo-300">
            <span>Terrible</span>
            <span>Excellent</span>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white">
              Submit Your Mood
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

