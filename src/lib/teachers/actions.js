"use server"

import { unstable_noStore as noStore } from "next/cache"

export async function getTeachers(schoolId) {
    noStore()
    try {
        const res = await fetch(`${process.env.BACKEND_URL || ""}/teachers/get-teachers/1/`, {
            cache: "no-store",
        })

        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`Failed to fetch teachers: ${res.status} ${res.statusText} - ${errorText}`)
        }

        const data = await res.json()
        return { teachers: data, error: null }
    } catch (error) {
        console.error("Error fetching teachers:", error)
        return { teachers: [], error: error.message }
    }
}

export async function createTeacher(teacherData) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL || ""}/teachers/create-teacher/1/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacherData),
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(JSON.stringify(errorData))
        }

        return await res.json()
    } catch (error) {
        console.error("Error creating teacher:", error)
        throw new Error(error.message || "Failed to create teacher")
    }
}

export async function deleteTeacher(teacherId) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL || ""}/school/1/teachers/${teacherId}/delete/`, {
            method: "DELETE",
        })

        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`Failed to delete teacher: ${res.status} ${res.statusText} - ${errorText}`)
        }

        return { success: true }
    } catch (error) {
        console.error("Error deleting teacher:", error)
        throw new Error(error.message || "Failed to delete teacher")
    }
}