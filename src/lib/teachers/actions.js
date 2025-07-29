'use server'

import { redirect } from "next/navigation";

const SCHOOL_ID = 1; 

async function getTeachers() {
    const res = await fetch(`${process.env.BACKEND_URL || ""}/teachers/get-teachers/1/`, {
        cache: "no-store",
    });
    if (!res.ok) {
        return { teachers: [], error: "Failed to fetch teachers" };
    }
    const teachers = await res.json();
    return { teachers, error: null };
}

async function getTeacher(id) {
    const res = await fetch(`${process.env.BACKEND_URL || ""}/school/${SCHOOL_ID}/teachers/${id}/`, {
        cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
}

async function updateTeacher(formData) {
    const id = formData.get("id");
    const dob = formData.get("date_of_birth");

    const data = {
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        phone_number: formData.get("phone_number"),
        qualification: formData.get("qualification"),
        gender: formData.get("gender"),
        experience_years: formData.get("experience_years"),
        subject_specialization: formData.get("subject_specialization"),
        address: formData.get("address"),
        assigned_class_ids: [1], // Placeholder
    };

    if (dob) {
        data.date_of_birth = dob;
    } else {
        data.date_of_birth = "";
    }

    const res = await fetch(`${process.env.BACKEND_URL || ""}/school/1/teachers/${id}/update/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error("Failed to update teacher. Status:", res.status, "Body:", errorBody);
        throw new Error(`Failed to update teacher: ${res.statusText} (${res.status})`);
    }
    redirect("/teachers");
}

async function deleteTeacher(id) {
    const res = await fetch(`${process.env.BACKEND_URL || ""}/school/1/teachers/${id}/delete/`, {
        method: "DELETE",
        cache: "no-store",
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error("Failed to delete teacher. Status:", res.status, "Body:", errorBody);
        throw new Error(`Failed to delete teacher: ${res.statusText} (${res.status})`);
    }
    redirect("/teachers");
}

export { getTeacher, updateTeacher, getTeachers, deleteTeacher };
