import { getClasses } from "@/lib/classes/actions";
import { getTeachers } from "@/lib/teachers/actions";
import ClassManagement from "./ClassManagment";

export default async function ClassesPage() {
    // Fetch classes and teachers in parallel
    const [{ data, error: classesError }, { teachers, error: teachersError }] = await Promise.all([
        getClasses(),
        getTeachers()
    ]);

    if (classesError || teachersError) {
        return <div className="p-5 text-red-500">Error fetching data: {classesError || teachersError}</div>;
    }

    const initialClasses = data?.classes || [];
    const initialStats = {
        total_classes: data?.total_classes || 0,
        total_students: data?.total_students || 0,
        average_students_per_class: data?.average_students_per_class || 0,
        subject_assignments: data?.subject_assignments || 0,
    };
    const availableTeachers = teachers || [];

    return <ClassManagement
                initialClasses={initialClasses}
                initialStats={initialStats}
                availableTeachers={availableTeachers}
            />;
}
