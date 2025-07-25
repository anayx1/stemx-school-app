"use server"

export async function createClass(formData) {
    try {
        const classData = {
            class_name: formData.get("className"),
            section: formData.get("section"),
            academic_year: formData.get("academicYear"),
            subjects: JSON.parse(formData.get("subjects") || "[]"),
        }

        // Replace with your actual API base URL
        const response = await fetch(`https://api.example.com/class/add/1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classData),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return {
                success: false,
                error: errorData.message || `HTTP error! status: ${response.status}`,
            }
        }

        const result = await response.json()
        return {
            success: true,
            data: result,
        }
    } catch (error) {
        console.error("Error creating class:", error)
        return {
            success: false,
            error: error.message || "Failed to create class. Please try again.",
        }
    }
}
export async function updateClass(classId, formData) {
    try {
        const updatedClassData = {
            grade: formData.get("grade"),
            section: formData.get("section"),
            classTeacherId: formData.get("classTeacherId"),
            room: formData.get("room"),
            totalStudents: Number.parseInt(formData.get("totalStudents"), 10) || 0,
            // className and classTeacher are derived on the client, so we might not send them directly
            // or derive them here if needed for the API. For now, assuming API expects grade/section/teacherId.
        }

        // Replace with your actual API base URL and endpoint for updating a class
        // Assuming an endpoint like /class/update/{classId}
        const response = await fetch(`https://api.example.com/class/update/${classId}`, {
            method: "PUT", // Or PATCH, depending on your API
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedClassData),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return {
                success: false,
                error: errorData.message || `HTTP error! status: ${response.status}`,
            }
        }

        const result = await response.json()
        return {
            success: true,
            data: result,
        }
    } catch (error) {
        console.error("Error updating class:", error)
        return {
            success: false,
            error: error.message || "Failed to update class. Please try again.",
        }
    }
}