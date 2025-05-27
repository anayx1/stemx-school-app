import { getAllQuizzes } from "@/lib/quiz-data"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Play, CheckCircle, Lock } from "lucide-react"

export default async function QuizzesPage() {
    const quizzes = await getAllQuizzes()

    const subjectColorMap = {
        maths: "bg-teal-100",
        science: "bg-violet-100",
        history: "bg-rose-100",
        english: "bg-lime-100",
        react: "bg-blue-100",
        css: "bg-purple-100",
        // add more as needed
    }

    const difficultyColorMap = {
        easy: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        hard: "bg-red-100 text-red-800",
    }

    // Filter quizzes by status
    const availableQuizzes = quizzes.filter((quiz) => quiz.status === "available")
    const completedQuizzes = quizzes.filter((quiz) => quiz.status === "completed")
    const lockedQuizzes = quizzes.filter((quiz) => quiz.status === "locked")

    const QuizCard = ({ quiz, showStatus = false }) => (
        <Card
            key={quiz.id}
            className={`flex flex-col ${subjectColorMap[quiz.subject] || "bg-gray-200"} shadow-lg hover:shadow-xl transition-shadow`}
        >
            <CardHeader>
                <div className="flex items-start justify-between mb-2">
                    <Badge className={difficultyColorMap[quiz.difficulty] || "bg-gray-100 text-gray-800"}>
                        {quiz.difficulty}
                    </Badge>
                    {showStatus && (
                        <Badge variant="outline" className="ml-2">
                            {quiz.status}
                        </Badge>
                    )}
                </div>
                <CardTitle className="text-lg font-bold">{quiz.title}</CardTitle>
                <CardDescription className="text-gray-700 text-sm">{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{quiz.duration} minutes</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <FileText className="w-4 h-4 mr-2" />
                        <span>{quiz.questions.length} questions</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Badge variant="outline" className="text-xs">
                            Subject: {quiz.subject}
                        </Badge>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                {quiz.status === "available" && (
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                        <Link href={`/quiz/${quiz.id}`}>
                            <Play className="w-4 h-4 mr-2" />
                            Start Quiz
                        </Link>
                    </Button>
                )}
                {quiz.status === "completed" && (
                    <Button variant="outline" className="w-full" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                    </Button>
                )}
                {quiz.status === "locked" && (
                    <Button variant="outline" className="w-full" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                    </Button>
                )}
            </CardFooter>
        </Card>
    )

    return (
        <section className="w-full min-h-[90dvh]">
            <div className="w-[95%] md:w-[90%] lg:w-[90%] justify-center items-center mx-auto py-8">
                <h1 className="text-3xl font-bold mb-8">Available Quizzes</h1>

                <Tabs defaultValue="available" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 ">
                        <TabsTrigger value="available" className="flex items-center gap-2 ">
                            <Play className="w-4 h-4 block sm:hidden" />
                            Available ({availableQuizzes.length})
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 block sm:hidden" />
                            Completed ({completedQuizzes.length})
                        </TabsTrigger>
                        <TabsTrigger value="locked" className="flex items-center gap-2">
                            <Lock className="w-4 h-4 block sm:hidden" />
                            Locked ({lockedQuizzes.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="available">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {availableQuizzes.length > 0 ? (
                                availableQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 text-lg">No available quizzes at the moment.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="completed">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedQuizzes.length > 0 ? (
                                completedQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 text-lg">No completed quizzes yet.</p>
                                    <p className="text-gray-400 text-sm mt-2">Complete some quizzes to see them here!</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="locked">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {lockedQuizzes.length > 0 ? (
                                lockedQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 text-lg">No locked quizzes.</p>
                                    <p className="text-gray-400 text-sm mt-2">All quizzes are available to you!</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export const metadata = {
    title: "Available Quizzes",
    description: "Select a quiz to begin",
}
