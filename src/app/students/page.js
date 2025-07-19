import React from 'react'
import StudentManagement from './StudentManagment'

async function fetchStudents() {
    const baseUrl = process.env.BACKEND_URL || ''
    const res = await fetch(`${baseUrl}/school/001/get-students/`, { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch students')
    }
    return res.json()
}

const page = async () => {
    const data = await fetchStudents()
    const students = data.students || (Array.isArray(data) ? data : [])
    return (
        <>
            <StudentManagement students={students} />
        </>
    )
}

export default page
