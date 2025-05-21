"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export default function QuizTimer({ duration, isPaused, onComplete, storageKey }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Try to get saved time from localStorage
    const savedTime = localStorage.getItem(storageKey)
    if (savedTime) {
      const parsedTime = Number.parseInt(savedTime, 10)
      // Ensure the time is valid and not expired
      if (!isNaN(parsedTime) && parsedTime > 0) {
        return parsedTime
      }
    }
    // Default to the provided duration (in minutes)
    return duration * 60
  })

  useEffect(() => {
    // Save time to localStorage whenever it changes
    localStorage.setItem(storageKey, timeLeft.toString())

    // Timer logic
    if (timeLeft <= 0) {
      onComplete()
      return
    }

    // Don't run the timer if paused
    if (isPaused) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1
        localStorage.setItem(storageKey, newTime.toString())
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isPaused, onComplete, storageKey])

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Determine color based on time left
  const getTimerColor = () => {
    if (timeLeft <= 60) return "destructive" // Last minute
    if (timeLeft <= 300) return "warning" // Last 5 minutes
    return "default"
  }

  return (
    <Badge variant={getTimerColor()} className="text-sm py-1 px-2">
      {formatTime()}
    </Badge>
  )
}
