import { getTeachers } from "@/lib/teachers/actions"
import TeacherManagement from "./TeacherManagment"

const Page = async () => {
    const { teachers, error } = await getTeachers()

    return <TeacherManagement teachers={teachers} error={error} />
}

export default Page
