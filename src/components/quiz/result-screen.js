"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import confetti from "@/lib/confetti"
import Link from "next/link"

export default function ResultScreen({ score }) {
  useEffect(() => {
    // Show confetti for high scores
    if (score && score.percentage >= 80 && !score.hasTextQuestions) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [score])

  const resetQuiz = () => {
    // Clear localStorage for this specific quiz
    if (score && score.quizId) {
      localStorage.removeItem(`quiz_${score.quizId}_answers`)
      localStorage.removeItem(`quiz_${score.quizId}_submitted`)
      localStorage.removeItem(`quiz_${score.quizId}_score`)
      localStorage.removeItem(`quiz_${score.quizId}_timeLeft`)
      localStorage.removeItem(`quiz_${score.quizId}_exits`)
      window.location.href = `/quiz/${score.quizId}`
    } else {
      // Fallback if no quiz ID
      window.location.href = "/quizzes"
    }
  }

  if (!score) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-700 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Quiz Results</h2>
            <p className="text-gray-600 mt-2">No results available</p>
            <Button asChild className="mt-6 bg-indigo-600 hover:bg-indigo-700">
              <Link href="/quizzes">Back to Quizzes</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[90dvh] flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-4">Result Of Your Practice Test</h1>

        <div className="bg-gradient2 rounded-xl shadow-lg overflow-hidden relative">
          {/* Notches on sides to match design */}
          <div className="absolute left-0 top-1/2 w-3 h-6 z-40 bg-white rounded-r-full -translate-y-1/2"></div>
          <div className="absolute right-0 top-1/2 w-3 h-6 z-40 bg-white rounded-l-full -translate-y-1/2"></div>

          <div className="p-6 text-center">
            {score.fullscreenExits > 0 && (
              <div className="text-amber-600 mb-4 flex items-center justify-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Fullscreen was exited {score.fullscreenExits} times during the quiz.
              </div>
            )}

            {score.hasTextQuestions ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Your answers have been submitted</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-center mt-4">
                  <p className="text-yellow-800">
                    Your quiz includes written responses that require manual grading. Results will be available after
                    review.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {score.percentage >= 70 ? "Congratulations! You" : "You"} have scored
                </h2>
                <div className="text-6xl font-bold text-white my-4">{score.percentage}%</div>

                <div className="border-t border-dashed border-gray-200 my-4"></div>

                <p className="text-white mb-2">
                  {score.percentage >= 80
                    ? "You earned the badge"
                    : score.percentage >= 60
                      ? "Good job! You're on the right track."
                      : "Keep practicing! Review the material and try again."}
                </p>

                {score.percentage >= 80 && (
                  <div className="flex justify-center my-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                        <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-yellow-600">
                          <div className="w-10 h-10 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-3 bg-gradient-to-r from-teal-400 via-white to-orange-400 rounded-sm"></div>
                      </div>
                      <div className="absolute -top-1 -right-2">
                        <div className="w-3 h-3 bg-yellow-300 transform rotate-45"></div>
                      </div>
                      <div className="absolute top-2 -left-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="absolute -bottom-1 right-0">
                        <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" asChild className="rounded-full flex items-center gap-2">
                <Link href="/quizzes">
                  <Home className="h-4 w-4" />
                  All Quizzes
                </Link>
              </Button>
              <Button
                onClick={resetQuiz}
                className="rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
