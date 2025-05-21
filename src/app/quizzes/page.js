import { getAllQuizzes } from "@/lib/quiz-data"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, FileText } from "lucide-react"

export default async function QuizzesPage() {
    const quizzes = await getAllQuizzes()
    const subjectColorMap = {
        maths: 'bg-teal-100',
        science: 'bg-violet-100',
        history: 'bg-rose-100',
        english: 'bg-lime-100',
        // add more as needed
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Available Quizzes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <Card key={quiz.id}
                        className={`flex flex-col ${subjectColorMap[quiz.subject] || 'bg-gray-200'} shadow-lg`}
                    >
                        <CardHeader>
                            <CardTitle>{quiz.title}</CardTitle>
                            <CardDescription className="text-gray-700">{quiz.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="flex items-center text-sm text-gray-700 mb-2">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>{quiz.duration} minutes</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700">
                                <FileText className="w-4 h-4 mr-2" />
                                <span>{quiz.questions.length} questions</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`/quiz/${quiz.id}`}>Start Quiz</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export const metadata = {
    title: "Available Quizzes",
    description: "Select a quiz to begin",
}
