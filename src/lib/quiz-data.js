// Mock database of quizzes
const quizzes = [
    {
        id: "test-quiz",
        title: "Test Quiz",
        subject: "maths",
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
            // {
            //     id: "tq3",
            //     type: "text",
            //     question: "Write a test answer here for validation purposes.",
            //     maxLength: 200,
            // },
        ],
    },
    {
        id: "web-security",
        title: "Web Security Fundamentals",
        subject: "english",

        description: "Test your knowledge of web security concepts and best practices",
        duration: 30, // minutes
        questions: [
            {
                id: "q1",
                type: "mcq",
                question: "Which of the following is NOT a common web security vulnerability?",
                options: [
                    { value: "xss", label: "Cross-Site Scripting (XSS)" },
                    { value: "csrf", label: "Cross-Site Request Forgery (CSRF)" },
                    { value: "sqli", label: "SQL Injection" },
                    { value: "tls", label: "Transport Layer Security (TLS)" },
                ],
                correctAnswer: "tls",
                multipleCorrect: false,
            },
            {
                id: "q2",
                type: "mcq",
                question: "Which of the following are effective ways to prevent XSS attacks? (Select all that apply)",
                options: [
                    { value: "input-validation", label: "Input validation and sanitization" },
                    { value: "csp", label: "Content Security Policy (CSP)" },
                    { value: "cookies", label: "Using HTTP-only cookies" },
                    { value: "encryption", label: "Encrypting the database" },
                ],
                correctAnswer: ["input-validation", "csp", "cookies"],
                multipleCorrect: true,
            },
            {
                id: "q3",
                type: "text",
                question: "Explain how Content Security Policy (CSP) helps prevent XSS attacks.",
                maxLength: 500,
            },
            {
                id: "q4",
                type: "mcq",
                question: "What is the primary purpose of HTTPS?",
                options: [
                    { value: "authentication", label: "To authenticate website visitors" },
                    { value: "encryption", label: "To encrypt data transmitted between client and server" },
                    { value: "caching", label: "To improve caching capabilities" },
                    { value: "compression", label: "To compress web content" },
                ],
                correctAnswer: "encryption",
                multipleCorrect: false,
            },
            {
                id: "q5",
                type: "mcq",
                question: "Which HTTP header helps prevent clickjacking attacks?",
                options: [
                    { value: "x-frame-options", label: "X-Frame-Options" },
                    { value: "x-xss-protection", label: "X-XSS-Protection" },
                    { value: "strict-transport-security", label: "Strict-Transport-Security" },
                    { value: "content-type", label: "Content-Type" },
                ],
                correctAnswer: "x-frame-options",
                multipleCorrect: false,
            },
        ],
    },
    {
        id: "javascript-basics",
        title: "JavaScript Fundamentals",
        subject: "science",

        description: "Test your knowledge of JavaScript basics and core concepts",
        duration: 20, // minutes
        questions: [
            {
                id: "js1",
                type: "mcq",
                question: "Which of the following is a primitive data type in JavaScript?",
                options: [
                    { value: "array", label: "Array" },
                    { value: "object", label: "Object" },
                    { value: "symbol", label: "Symbol" },
                    { value: "function", label: "Function" },
                ],
                correctAnswer: "symbol",
                multipleCorrect: false,
            },
            {
                id: "js2",
                type: "mcq",
                question: "Which of these statements correctly creates a variable in modern JavaScript?",
                options: [
                    { value: "var", label: "var name = 'John';" },
                    { value: "let", label: "let name = 'John';" },
                    { value: "const", label: "const name = 'John';" },
                    { value: "both-b-c", label: "Both B and C are correct" },
                ],
                correctAnswer: "both-b-c",
                multipleCorrect: false,
            },
            {
                id: "js3",
                type: "mcq",
                question: "Which of the following are JavaScript array methods? (Select all that apply)",
                options: [
                    { value: "map", label: "map()" },
                    { value: "filter", label: "filter()" },
                    { value: "select", label: "select()" },
                    { value: "reduce", label: "reduce()" },
                ],
                correctAnswer: ["map", "filter", "reduce"],
                multipleCorrect: true,
            },
            {
                id: "js4",
                type: "text",
                question: "Explain the difference between '==' and '===' operators in JavaScript.",
                maxLength: 500,
            },
            {
                id: "js5",
                type: "mcq",
                question: "What does the 'this' keyword refer to in JavaScript?",
                options: [
                    { value: "global", label: "Always refers to the global object" },
                    { value: "context", label: "Depends on how a function is called" },
                    { value: "window", label: "Always refers to the window object" },
                    { value: "function", label: "Always refers to the function it's used in" },
                ],
                correctAnswer: "context",
                multipleCorrect: false,
            },
        ],
    },
    {
        id: "react-fundamentals",
        title: "React Fundamentals",
        description: "Test your knowledge of React core concepts and best practices",
        duration: 25, // minutes
        questions: [
            {
                id: "react1",
                type: "mcq",
                question: "What is JSX in React?",
                options: [
                    { value: "javascript", label: "A JavaScript library" },
                    { value: "syntax", label: "A syntax extension for JavaScript" },
                    { value: "framework", label: "A complete framework" },
                    { value: "compiler", label: "A JavaScript compiler" },
                ],
                correctAnswer: "syntax",
                multipleCorrect: false,
            },
            {
                id: "react2",
                type: "mcq",
                question: "Which hook is used for side effects in React?",
                options: [
                    { value: "useState", label: "useState" },
                    { value: "useEffect", label: "useEffect" },
                    { value: "useContext", label: "useContext" },
                    { value: "useReducer", label: "useReducer" },
                ],
                correctAnswer: "useEffect",
                multipleCorrect: false,
            },
            {
                id: "react3",
                type: "mcq",
                question: "Which of the following are valid ways to create a React component? (Select all that apply)",
                options: [
                    { value: "function", label: "Function component" },
                    { value: "class", label: "Class component" },
                    { value: "object", label: "Object literal" },
                    { value: "generator", label: "Generator function" },
                ],
                correctAnswer: ["function", "class"],
                multipleCorrect: true,
            },
            {
                id: "react4",
                type: "text",
                question: "Explain the concept of 'lifting state up' in React and why it's important.",
                maxLength: 500,
            },
            {
                id: "react5",
                type: "mcq",
                question: "What is the purpose of keys in React lists?",
                options: [
                    { value: "styling", label: "To apply styles to list items" },
                    { value: "identification", label: "To help React identify which items have changed" },
                    { value: "ordering", label: "To specify the order of items" },
                    { value: "animation", label: "To enable animations between list updates" },
                ],
                correctAnswer: "identification",
                multipleCorrect: false,
            },
        ],
    },
]

// Function to get all quizzes (simulating a database query)
export async function getAllQuizzes() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Return quiz metadata without questions for the listing page
    return quizzes.map((quiz) => ({
        id: quiz.id,
        subject: quiz.subject,
        title: quiz.title,
        description: quiz.description,
        duration: quiz.duration,
        questions: quiz.questions.map((q) => ({ id: q.id, type: q.type })), // Only send minimal question info
    }))
}

// Function to get a specific quiz by ID
export async function getQuizById(id) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return quizzes.find((quiz) => quiz.id === id) || null
}
