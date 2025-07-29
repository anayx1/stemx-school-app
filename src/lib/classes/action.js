"use server"

export async function createClass(formData) {
  try {
    // Extract and validate data
    const className = formData.get("className")?.trim()
    const section = formData.get("section")?.trim()
    const academicYear = formData.get("academicYear")?.trim()
    const subjectsString = formData.get("subjects")

    // Validation
    if (!className) {
      return { success: false, error: "Class name is required" }
    }
    if (!section) {
      return { success: false, error: "Section is required" }
    }
    if (!academicYear) {
      return { success: false, error: "Academic year is required" }
    }

    let subjects = []
    try {
      subjects = JSON.parse(subjectsString || "[]")
    } catch (parseError) {
      return { success: false, error: "Invalid subjects data" }
    }

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return { success: false, error: "At least one subject is required" }
    }

    // Prepare API payload
    const classData = {
      class_name: className,
      section: section,
      academic_year: academicYear,
      subjects: subjects.map((subject) => ({
        name: subject.name || "",
        code: subject.code || "",
        description: subject.description || "",
      })),
    }

    // Make API call
    const response = await fetch(`http://13.60.207.229:8000/api/v1/school/class/add/1/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authentication headers if needed
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(classData),
    })

    // Handle response
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`

      try {
        const errorData = await response.json()
        if (errorData.message) {
          errorMessage = errorData.message
        } else if (errorData.detail) {
          errorMessage = errorData.detail
        } else if (errorData.error) {
          errorMessage = errorData.error
        }
      } catch (parseError) {
        // Use default error message if JSON parsing fails
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    const result = await response.json()

    return {
      success: true,
      data: result,
      message: "Class created successfully!",
    }
  } catch (error) {
    console.error("Error creating class:", error)

    // Handle different types of errors
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return {
        success: false,
        error: "Network error. Please check your internet connection and try again.",
      }
    }

    return {
      success: false,
      error: error.message || "Failed to create class. Please try again.",
    }
  }
}
