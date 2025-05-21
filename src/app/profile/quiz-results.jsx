import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, Clock } from "lucide-react"

export default function QuizResults({ results }) {
  // Calculate average score
  const averageScore = results.reduce((acc, result) => acc + result.score, 0) / results.length

  // Find best and worst subjects
  const sortedResults = [...results].sort((a, b) => b.score - a.score)
  const bestSubject = sortedResults[0]
  const worstSubject = sortedResults[sortedResults.length - 1]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Quiz Results & Reports</h2>
        <p className="text-gray-500">Track your performance across different subjects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            <Progress value={averageScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Best Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bestSubject.subject}</div>
            <div className="text-sm text-gray-500 mt-1">{bestSubject.score}% score</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Needs Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{worstSubject.subject}</div>
            <div className="text-sm text-gray-500 mt-1">{worstSubject.score}% score</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {results.map((quiz) => (
              <Card key={quiz.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{quiz.subject} Quiz</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{quiz.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{quiz.totalQuestions} questions</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold">{quiz.score}%</div>
                        <div className="text-xs text-gray-500">
                          {quiz.score >= 90
                            ? "Excellent"
                            : quiz.score >= 80
                              ? "Good"
                              : quiz.score >= 70
                                ? "Average"
                                : "Needs Improvement"}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <BarChart className="h-6 w-6 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Recent quiz results will appear here</h3>
                <p className="text-gray-500 mt-2">Take more quizzes to see your recent performance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Detailed analytics coming soon</h3>
                <p className="text-gray-500 mt-2">We're working on advanced analytics features</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
