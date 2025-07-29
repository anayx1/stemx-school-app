
import { notFound, redirect } from "next/navigation";
import EditTeacherForm from "./EditTeacherForm";
import { getTeacher, updateTeacher } from "@/lib/teachers/actions";

export default async function EditTeacherPage({ params: { id } }) {
    const teacher = await getTeacher(id);
    if (!teacher) return notFound();

    return <EditTeacherForm teacher={teacher} handleAction={updateTeacher} />;
}
