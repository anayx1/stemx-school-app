// Updated sample quiz data with status and difficulty fields
const quizzes = [
    {
        id: "test-quiz",
        title: "Test Quiz",
        subject: "maths",
        difficulty: "medium",
        status: "available", // available, completed, locked
        description: "A simple test quiz to verify answer submission and handling",
        duration: 10, // minutes
        questions: [
            {
                id: "tq1",
                type: "mcq",
                question: "Option A is correct for Q1?",
                options: [
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                    { value: "c", label: "Option C" },
                    { value: "d", label: "Option D" },
                ],
                correctAnswer: "a",
                multipleCorrect: false,
            },
            {
                id: "tq2",
                type: "mcq",
                question: "Options A & B are correct for Q2 (Select all that apply)",
                options: [
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                    { value: "c", label: "Option C" },
                    { value: "d", label: "Option D" },
                ],
                correctAnswer: ["a", "b"],
                multipleCorrect: true,
            },
        ],
    },
    {
        id: "react-fundamentals",
        title: "React Fundamentals",
        subject: "react",
        difficulty: "medium",
        status: "available",
        description: "Test your knowledge of React core concepts and best practices",
        duration: 25,
        questions: [
            {
                id: "rf1",
                type: "mcq",
                question: "What is JSX?",
                options: [
                    { value: "a", label: "JavaScript XML" },
                    { value: "b", label: "Java Syntax Extension" },
                    { value: "c", label: "JSON XML" },
                    { value: "d", label: "JavaScript Extension" },
                ],
                correctAnswer: "a",
                multipleCorrect: false,
            },
            // Add more questions...
        ],
    },
    {
        id: "css-advanced",
        title: "Advanced CSS Techniques",
        subject: "css",
        difficulty: "hard",
        status: "completed",
        description: "Explore modern CSS features and advanced styling techniques",
        duration: 30,
        questions: [
            {
                id: "css1",
                type: "mcq",
                question: "Which CSS property is used for flexbox?",
                options: [
                    { value: "a", label: "display: flex" },
                    { value: "b", label: "flex: true" },
                    { value: "c", label: "flexbox: on" },
                    { value: "d", label: "layout: flex" },
                ],
                correctAnswer: "a",
                multipleCorrect: false,
            },
            // Add more questions...
        ],
    },
    {
        id: "advanced-algorithms",
        title: "Advanced Algorithms",
        subject: "maths",
        difficulty: "hard",
        status: "locked",
        description: "Complex algorithmic problems and data structures",
        duration: 45,
        questions: [
            // Add questions...
        ],
    },
]

export async function getAllQuizzes() {
    // Simulate async operation
    return Promise.resolve(quizzes)
}

export async function getQuizById(id) {
    const quiz = quizzes.find((q) => q.id === id)
    return Promise.resolve(quiz)
}
