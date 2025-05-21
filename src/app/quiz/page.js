import { redirect } from "next/navigation"
import { getAllQuizzes } from "@/lib/quiz-data"

export default async function QuizIndexPage() {
    const quizzes = await getAllQuizzes()

    // If there's only one quiz, redirect to it
    if (quizzes.length === 1) {
        redirect(`/quiz/${quizzes[0].id}`)
    }

    // Otherwise, redirect to the quiz list
    redirect("/quizzes")
}
