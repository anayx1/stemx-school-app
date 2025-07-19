"use server"

import { revalidatePath } from 'next/cache'

export async function deleteStudent(studentId) {
    const url = `${process.env.BACKEND_URL || ""}/school/1/students/${studentId}/delete/`

    const res = await fetch(url, {
        method: "DELETE",
    });

    if (!res.ok) {
        let errorData;
        try {
            errorData = await res.json();
        } catch (e) {
            errorData = { error: "An unexpected error occurred." };
        }
        throw new Error(errorData.error || "Failed to delete student");
    }

    revalidatePath('/students');
}


export async function addStudent(data) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/student`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add student");
    }

    return res.json();
}
