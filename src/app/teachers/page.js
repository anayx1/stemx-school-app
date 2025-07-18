import { getTeachers } from "@/lib/Teacher/action"
import TeacherManagement from "./TeacherManagment"

const Page = async () => {
    let teachers = []
    let error = null

    try {
        teachers = await getTeachers()
        console.log("Fetched teachers in page:", teachers)
    } catch (err) {
        console.error("Failed to fetch teachers:", err)
        error = err.message
    }

    return <TeacherManagement teachers={teachers} error={error} />
}

export default Page
