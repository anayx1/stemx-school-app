// app/classes/page.js
import { availableTeachers, getClasses } from "@/lib/classes/data"
import ClassManagement from "./ClassManagment"

export default async function ClassesPage() {
    const classesResult = await getClasses(1) // school_user_id = 1

    return (
        <ClassManagement
            initialClasses={classesResult.data}
            availableTeachers={availableTeachers}
            error={classesResult.success ? null : classesResult.error}
        />
    )
}
