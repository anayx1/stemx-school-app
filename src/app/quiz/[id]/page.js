import { getQuizById } from "@/lib/quiz-data"
import QuizClient from "@/components/quiz/quiz-client"
import { notFound } from "next/navigation"

export default async function QuizPage({ params }) {
    const quizId = params.id
    const quiz = await getQuizById(quizId)

    if (!quiz) {
        notFound()
    }

    return <QuizClient quiz={quiz} quizId={quizId} />
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
    const quizId = params.id
    const quiz = await getQuizById(quizId)

    if (!quiz) {
        return {
            title: "Quiz Not Found",
        }
    }

    return {
        title: `${quiz.title} | Secure Quiz`,
        description: quiz.description,
    }
}
