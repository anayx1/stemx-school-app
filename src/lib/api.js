// This file simulates API calls to a backend server
// In a real application, you would replace these with actual API calls

export async function getCourse(courseId) {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data for Photosynthesis course
  if (courseId === "photosynthesis-basics") {
    return {
      id: "photosynthesis-basics",
      title: "Photosynthesis- How Plants Make Food | Learn with BYJU'S",
      description:
        "Learn how plants convert light energy into chemical energy through photosynthesis, and understand the fundamental process of food production in plants.",
      rating: 4.8,
      ratingCount: 2845,
      studentCount: 98756,
      totalDuration: "45 minutes",
      currentSection: 1,
      totalSections: 5,
      instructor: {
        name: "Dr. Sarah Green",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      prevLesson: null,
      nextLesson: {
        id: "light-dependent-reactions",
        title: "Light-Dependent Reactions in Photosynthesis",
      },
      currentLesson: {
        id: "photosynthesis-introduction",
        title: "Introduction to Photosynthesis",
        duration: "5min",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/K8OssnSp8ks",
        completed: true,
        isActive: true,
      },
      sections: [
        {
          id: "section-1",
          title: "Understanding Photosynthesis",
          completedLessons: 1,
          totalDuration: "45min",
          lessons: [
            {
              id: "photosynthesis-introduction",
              order: 1,
              title: "Introduction to Photosynthesis",
              duration: "5min",
              type: "video",
              completed: true,
              isActive: true,
            },
            {
              id: "light-dependent-reactions",
              order: 2,
              title: "Light-Dependent Reactions in Photosynthesis",
              duration: "12min",
              type: "video",
              completed: false,
              isActive: false,
            },
            {
              id: "calvin-cycle",
              order: 3,
              title: "The Calvin Cycle: Carbon Fixation",
              duration: "10min",
              type: "video",
              completed: false,
              isActive: false,
            },
            {
              id: "chloroplast-structure",
              order: 4,
              title: "Structure and Function of Chloroplasts",
              duration: "8min",
              type: "video",
              completed: false,
              isActive: false,
            },
            {
              id: "factors-affecting",
              order: 5,
              title: "Factors Affecting Photosynthesis Rate",
              duration: "8min",
              type: "video",
              completed: false,
              isActive: false,
            },
            {
              id: "quiz-photosynthesis",
              order: 6,
              title: "Quiz: Test Your Knowledge of Photosynthesis",
              duration: "2min",
              type: "video",
              completed: false,
              isActive: false,
            },
          ],
        },
      ],
    }
  }

  // Return null if course not found
  return null
}