"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Smile, BarChart2, Lightbulb } from 'lucide-react'

export default function LandingPage() {
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-roboto text-shadow-glow">
            Welcome to <span className="bg-gradient-to-r from-red-500 to-red-800 text-transparent bg-clip-text">Moody</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-roboto">
            Track your emotions, understand your patterns, and improve your well-being with our intuitive mood tracking app.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/tracker" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:text-lg md:px-10 md:py-4 transition duration-150 ease-in-out font-roboto shadow-glow">
              Get Started
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center font-roboto">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Daily Mood Tracking", description: "Log your mood every day with our intuitive interface.", icon: Smile },
              { title: "Insightful Analytics", description: "Visualize your mood patterns with beautiful charts and graphs.", icon: BarChart2 },
              { title: "Personalized Insights", description: "Receive tailored recommendations based on your mood history.", icon: Lightbulb }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="bg-gray-800 bg-opacity-50 p-6 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <feature.icon className="w-12 h-12 mb-4 mx-auto text-red-500" />
                <h3 className="text-xl font-semibold mb-3 font-roboto">{feature.title}</h3>
                <p className="text-gray-300 font-roboto">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

