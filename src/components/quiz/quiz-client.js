"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Clock } from "lucide-react"
import FullscreenModal from "@/components/quiz/fullscreen-modal"
import QuizTimer from "@/components/quiz/quiz-timer"
import MCQQuestion from "@/components/quiz/mcq-question"
import TextQuestion from "@/components/quiz/text-question"
import ResultScreen from "@/components/quiz/result-screen"
import { useToast } from "@/components/ui/use-toast"

export default function QuizClient({ quiz, quizId }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFullscreenModal, setShowFullscreenModal] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [isTimerPaused, setIsTimerPaused] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [fullscreenExits, setFullscreenExits] = useState(0)
  const quizContainerRef = useRef(null)

  // Create unique localStorage keys for this quiz
  const answersKey = `quiz_${quizId}_answers`
  const submittedKey = `quiz_${quizId}_submitted`
  const scoreKey = `quiz_${quizId}_score`
  const timeKey = `quiz_${quizId}_timeLeft`
  const exitsKey = `quiz_${quizId}_exits`

  // Initialize answers from localStorage or create empty object
  useEffect(() => {
    const savedAnswers = localStorage.getItem(answersKey)
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    } else {
      // Initialize empty answers object
      const initialAnswers = {}
      quiz.questions.forEach((question) => {
        if (question.type === "mcq") {
          if (question.multipleCorrect) {
            initialAnswers[question.id] = []
          } else {
            initialAnswers[question.id] = null
          }
        } else if (question.type === "text") {
          initialAnswers[question.id] = ""
        }
      })
      setAnswers(initialAnswers)
    }

    // Check if quiz was already submitted
    const submissionStatus = localStorage.getItem(submittedKey)
    if (submissionStatus === "true") {
      setIsSubmitted(true)
      const savedScore = localStorage.getItem(scoreKey)
      if (savedScore) {
        setScore(JSON.parse(savedScore))
      }
    }

    // Load saved fullscreen exits count
    const savedExits = localStorage.getItem(exitsKey)
    if (savedExits) {
      setFullscreenExits(Number.parseInt(savedExits, 10))
    }
  }, [quizId, quiz.questions, answersKey, submittedKey, scoreKey, exitsKey])

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(answersKey, JSON.stringify(answers))
    }
  }, [answers, answersKey])

  // Handle fullscreen
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (quizContainerRef.current && !document.fullscreenElement) {
          await quizContainerRef.current.requestFullscreen()
          setIsFullscreen(true)
          setShowFullscreenModal(false)
          setIsTimerPaused(false)
        }
      } catch (error) {
        console.error("Error attempting to enable fullscreen:", error)
        toast({
          title: "Fullscreen Error",
          description: "Unable to enter fullscreen mode. Please try again.",
          variant: "destructive",
        })
      }
    }

    // Try to enter fullscreen on mount
    if (!isSubmitted) {
      enterFullscreen()
    }

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement
      setIsFullscreen(isCurrentlyFullscreen)

      if (!isCurrentlyFullscreen && !isSubmitted) {
        setShowFullscreenModal(true)
        setIsTimerPaused(true)

        // Update fullscreen exits count
        const newExitCount = fullscreenExits + 1
        setFullscreenExits(newExitCount)
        localStorage.setItem(exitsKey, newExitCount.toString())

        // Log fullscreen exit
        console.log("Fullscreen exited. Total exits:", newExitCount)
      }
    }

    // Security measures
    const preventDefaultAction = (e) => {
      e.preventDefault()
      return false
    }

    const preventKeyboardShortcuts = (e) => {
      // Prevent common keyboard shortcuts
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "c" || e.key === "v" || e.key === "x" || e.key === "a" || e.key === "p")
      ) {
        e.preventDefault()
        return false
      }
    }

    // Online/offline detection
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine)
      if (!navigator.onLine) {
        toast({
          title: "Connection Lost",
          description: "You are currently offline. Please reconnect to continue.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Connection Restored",
          description: "You are back online.",
        })
      }
    }

    // Add event listeners
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("contextmenu", preventDefaultAction)
    document.addEventListener("copy", preventDefaultAction)
    document.addEventListener("cut", preventDefaultAction)
    document.addEventListener("paste", preventDefaultAction)
    document.addEventListener("keydown", preventKeyboardShortcuts)
    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    // Warn before unload/navigation
    const handleBeforeUnload = (e) => {
      if (!isSubmitted) {
        const message = "Are you sure you want to leave? Your progress may be lost."
        e.returnValue = message
        return message
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("contextmenu", preventDefaultAction)
      document.removeEventListener("copy", preventDefaultAction)
      document.removeEventListener("cut", preventDefaultAction)
      document.removeEventListener("paste", preventDefaultAction)
      document.removeEventListener("keydown", preventKeyboardShortcuts)
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isSubmitted, fullscreenExits, toast, exitsKey])

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score for MCQs
    let correctAnswers = 0
    let totalMCQs = 0
    let hasTextQuestions = false

    quiz.questions.forEach((question) => {
      if (question.type === "mcq") {
        totalMCQs++
        const userAnswer = answers[question.id]

        if (question.multipleCorrect) {
          // For multiple correct answers, check if arrays match (regardless of order)
          const userSet = new Set(userAnswer || [])
          const correctSet = new Set(question.correctAnswer)

          if (userSet.size === correctSet.size && [...userSet].every((value) => correctSet.has(value))) {
            correctAnswers++
          }
        } else {
          // For single correct answer
          if (userAnswer === question.correctAnswer) {
            correctAnswers++
          }
        }
      } else if (question.type === "text") {
        hasTextQuestions = true
      }
    })

    // Calculate percentage score
    const percentage = totalMCQs > 0 ? Math.round((correctAnswers / totalMCQs) * 100) : 0

    const scoreData = {
      percentage,
      correctAnswers,
      totalMCQs,
      hasTextQuestions,
      fullscreenExits,
      quizId,
      quizTitle: quiz.title,
    }

    setScore(scoreData)
    setIsSubmitted(true)
    localStorage.setItem(submittedKey, "true")
    localStorage.setItem(scoreKey, JSON.stringify(scoreData))

    // Exit fullscreen after submission
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  const handleTimerComplete = () => {
    if (!isSubmitted) {
      handleSubmit()
      toast({
        title: "Time's Up!",
        description: "Your quiz has been automatically submitted.",
        variant: "default",
      })
    }
  }

  // If quiz is already submitted, show results
  if (isSubmitted) {
    return <ResultScreen score={score} />
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div ref={quizContainerRef} className="min-h-screen bg-gray-50 p-4 flex flex-col">
      {/* Fullscreen Modal */}
      <FullscreenModal
        isOpen={showFullscreenModal}
        onEnterFullscreen={() => {
          if (quizContainerRef.current) {
            quizContainerRef.current.requestFullscreen()
          }
        }}
      />

      {/* Quiz Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-gray-500">{quiz.description}</p>
          </div>

          <div className="flex items-center gap-4">
            {!isOnline && (
              <div className="flex items-center text-red-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">Offline</span>
              </div>
            )}

            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-700" />
              <QuizTimer
                duration={quiz.duration}
                isPaused={isTimerPaused}
                onComplete={handleTimerComplete}
                storageKey={timeKey}
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Card */}
      <Card className="max-w-4xl mx-auto p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h2>

          {currentQuestion.type === "mcq" && (
            <MCQQuestion
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
            />
          )}

          {currentQuestion.type === "text" && (
            <TextQuestion
              question={currentQuestion}
              value={answers[currentQuestion.id] || ""}
              onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
            />
          )}
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto flex justify-between">
        <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>

        <div className="flex gap-2">
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit}>Submit Quiz</Button>
          ) : (
            <Button onClick={handleNextQuestion}>Next</Button>
          )}
        </div>
      </div>
    </div>
  )
}
