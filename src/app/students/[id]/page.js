import { notFound, redirect } from "next/navigation";
import EditStudentForm from "./EditStudentForm";

async function getStudent(id) {
    const res = await fetch(`${process.env.BACKEND_URL || ""}/students/profile/${id}/`, {
        cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
}

export default async function EditStudentPage({ params }) {
    const student = await getStudent(params.id);
    if (!student) return notFound();

    async function handleAction(formData) {
        "use server";

        const file = formData.get("profile_picture_file");
        const dob = formData.get("date_of_birth");
        const admissionDate = formData.get("admission_date");

        const data = new FormData();
        data.append("contact_number", formData.get("phone"));
        data.append("address", formData.get("address"));

        if (dob) {
            data.append("date_of_birth", dob);
        } else {
            data.append("date_of_birth", "");
        }

        if (admissionDate) {
            data.append("admission_date", admissionDate);
        } else {
            data.append("admission_date", "");
        }

        if (file && file.size > 0) {
            data.append("profile_picture", file);
        }

        const res = await fetch(`${process.env.BACKEND_URL || ""}/students/profile/${params.id}/`, {
            method: "PUT",
            body: data,
            cache: "no-store",
        });

        if (!res.ok) {
            const errorBody = await res.text();
            console.error("Failed to update student. Status:", res.status, "Body:", errorBody);
            throw new Error(`Failed to update student: ${res.statusText} (${res.status})`);
        }
        redirect("/students");
    }

    return <EditStudentForm student={student} handleAction={handleAction} />;
}