"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample students data (same as StudentManagment.js)
const studentsData = [
    {
        id: "STU001",
        name: "Alex Johnson",
        email: "alex.johnson@email.com",
        grade: "Grade 10",
        class: "10-A",
        status: "Active",
        lastLogin: "2024-01-15",
        phone: "+1 234-567-8901",
        gpa: "3.8",
        attendance: "95%",
        fees: "$1,200",
    },
    {
        id: "STU002",
        name: "Emma Thompson",
        email: "emma.thompson@email.com",
        grade: "Grade 11",
        class: "11-B",
        status: "Active",
        lastLogin: "2024-01-14",
        phone: "+1 234-567-8902",
        gpa: "3.9",
        attendance: "98%",
        fees: "$1,200",
    },
    {
        id: "STU003",
        name: "Sarah Williams",
        email: "sarah.williams@email.com",
        grade: "Grade 9",
        class: "9-C",
        status: "Inactive",
        lastLogin: "2024-01-10",
        phone: "+1 234-567-8903",
        gpa: "3.2",
        attendance: "78%",
        fees: "$0",
    },
    {
        id: "STU004",
        name: "David Miller",
        email: "david.miller@email.com",
        grade: "Grade 12",
        class: "12-A",
        status: "Active",
        lastLogin: "2024-01-16",
        phone: "+1 234-567-8904",
        gpa: "3.7",
        attendance: "92%",
        fees: "$1,200",
    },
    {
        id: "STU005",
        name: "Jessica Garcia",
        email: "jessica.garcia@email.com",
        grade: "Grade 10",
        class: "10-B",
        status: "Pending",
        lastLogin: "2024-01-13",
        phone: "+1 234-567-8905",
        gpa: "3.5",
        attendance: "88%",
        fees: "$600",
    },
    {
        id: "STU006",
        name: "Michael Brown",
        email: "michael.brown@email.com",
        grade: "Grade 9",
        class: "9-A",
        status: "Active",
        lastLogin: "2024-01-12",
        phone: "+1 234-567-8906",
        gpa: "3.6",
        attendance: "94%",
        fees: "$1,200",
    },
    {
        id: "STU007",
        name: "Ashley Davis",
        email: "ashley.davis@email.com",
        grade: "Grade 11",
        class: "11-C",
        status: "Rejected",
        lastLogin: "2024-01-08",
        phone: "+1 234-567-8907",
        gpa: "2.8",
        attendance: "65%",
        fees: "$0",
    },
    {
        id: "STU008",
        name: "Christopher Wilson",
        email: "christopher.wilson@email.com",
        grade: "Grade 12",
        class: "12-B",
        status: "Active",
        lastLogin: "2024-01-17",
        phone: "+1 234-567-8908",
        gpa: "3.9",
        attendance: "96%",
        fees: "$1,200",
    },
]

// Get student from mock data
function getStudent(id) {
    return studentsData.find((s) => s.id === id) || null
}

export default function EditStudentPage({ params }) {
    const router = useRouter()
    const id = params?.id
    const student = getStudent(id)

    if (!student) return <div className="p-8">Student not found.</div>

    const [form, setForm] = useState({
        name: student.name,
        email: student.email,
        grade: student.grade,
        class: student.class,
        status: student.status,
        lastLogin: student.lastLogin,
        phone: student.phone,
        gpa: student.gpa,
        attendance: student.attendance,
        fees: student.fees,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        // Only allow changes to fields that are not unchangeable
        if (!["id", "gpa", "fees", "lastLogin"].includes(name)) {
            setForm({ ...form, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Update the mock data in memory (for demo only)
        const idx = studentsData.findIndex((s) => s.id === id)
        if (idx !== -1) {
            studentsData[idx] = { ...studentsData[idx], ...form }
        }
        router.push("/students")
    }

    return (
        <div className="max-w-xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Student: {student.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">ID</label>
                            <Input name="id" value={student.id} disabled />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <Input name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <Input name="email" value={form.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Grade</label>
                            <Input name="grade" value={form.grade} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Class</label>
                            <Input name="class" value={form.class} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Status</label>
                            <Input name="status" value={form.status} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Last Login</label>
                            <Input name="lastLogin" value={form.lastLogin} disabled />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Phone</label>
                            <Input name="phone" value={form.phone} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">GPA</label>
                            <Input name="gpa" value={form.gpa} disabled />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Attendance</label>
                            <Input name="attendance" value={form.attendance} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Fees</label>
                            <Input name="fees" value={form.fees} disabled />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit">Save</Button>
                            <Button type="button" variant="outline" onClick={() => router.push("/students")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

/*
//REAL API CALLS 
import { notFound, redirect } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


async function getStudent(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/student/${id}`, {
        cache: "no-store",
    })
    if (!res.ok) return null
    return res.json()
}


async function updateStudent(id, formData) {
    "use server"
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/student/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        cache: "no-store",
    })
    if (!res.ok) {
        throw new Error("Failed to update student")
    }
    redirect("/students")
}

export default async function EditStudentPage({ params }) {
    const { id } = await params
    const student = await getStudent(id)
    if (!student) return notFound()


    async function handleAction(formData) {
        "use server"
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            grade: formData.get("grade"),
            class: formData.get("class"),
            status: formData.get("status"),
            phone: formData.get("phone"),
            attendance: formData.get("attendance"),
            // id, gpa, fees, lastLogin are unchangeable, so not included here
        }
        await updateStudent(id, data)
    }

    return (
        <div className="max-w-xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Student: {student.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleAction} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">ID</label>
                            <Input name="id" defaultValue={student.id} disabled />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <Input name="name" defaultValue={student.name} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <Input name="email" defaultValue={student.email} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Grade</label>
                            <Input name="grade" defaultValue={student.grade} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Class</label>
                            <Input name="class" defaultValue={student.class} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Status</label>
                            <Input name="status" defaultValue={student.status} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Last Login</label>
                            <Input name="lastLogin" defaultValue={student.lastLogin} disabled />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Phone</label>
                            <Input name="phone" defaultValue={student.phone} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">GPA</label>
                            <Input name="gpa" defaultValue={student.gpa} disabled />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Attendance</label>
                            <Input name="attendance" defaultValue={student.attendance} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Fees</label>
                            <Input name="fees" defaultValue={student.fees} disabled />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit">Save</Button>
                            <Button type="button" variant="outline" formAction="/students">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}*/