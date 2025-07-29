// lib/classes/data.js - Regular functions for data fetching (no "use server")

export async function getClasses(schoolId = 1) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/classes/${schoolId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // Add any authentication headers if needed
            // 'Authorization': `Bearer ${token}`,
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (!result.status) {
            throw new Error("API returned unsuccessful status")
        }

        // Transform API response to match component expectations
        const transformedClasses = result.classes.map((apiClass, index) => ({
            id: `CLS${String(index + 1).padStart(3, "0")}`,
            grade: apiClass.class_name || "N/A",
            section: apiClass.section || "A",
            className: `${apiClass.class_name}-${apiClass.section}`,
            classTeacher: "Not Assigned", // Default since API doesn't provide this
            classTeacherId: "TCH000",
            totalStudents: 0, // Default since API doesn't provide this
            room: `Room ${100 + index + 1}`, // Default room assignment
            academicYear: apiClass.academic_year || "2024-2025",
            subjects: apiClass.subjects.map((subject) => ({
                id: subject.id,
                subject: subject.name,
                teacher: "Not Assigned", // Default since API doesn't provide teacher info
                teacherId: "TCH000",
            })),
        }))

        return {
            success: true,
            data: transformedClasses,
        }
    } catch (error) {
        console.error("Error fetching classes:", error)
        return {
            success: false,
            error: error.message || "Failed to fetch classes. Please try again.",
            data: [],
        }
    }
}

// Available teachers data (you might want to fetch this from API too)
export const availableTeachers = [
    { id: "TCH001", name: "Mr. John Smith", department: "Mathematics" },
    { id: "TCH002", name: "Ms. Lisa Anderson", department: "Science" },
    { id: "TCH003", name: "Dr. Michael Brown", department: "English" },
    { id: "TCH004", name: "Ms. Emily Davis", department: "History" },
    { id: "TCH005", name: "Mr. Robert Wilson", department: "Mathematics" },
    { id: "TCH006", name: "Ms. Jennifer Taylor", department: "Science" },
    { id: "TCH007", name: "Dr. William Martinez", department: "English" },
    { id: "TCH008", name: "Ms. Sarah Johnson", department: "History" },
]
