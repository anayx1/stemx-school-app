"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const grades = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]
const sections = ["A", "B", "C", "D", "E"]
const rooms = [
    "Room 101",
    "Room 102",
    "Room 103",
    "Room 201",
    "Room 202",
    "Room 203",
    "Room 301",
    "Room 302",
    "Room 303",
    "Room 401",
    "Room 402",
    "Room 403",
]

export default function EditClassModal({ isOpen, onClose, onEdit, classData, availableTeachers }) {
    const [formData, setFormData] = useState({
        grade: "",
        section: "",
        classTeacherId: "",
        room: "",
        totalStudents: "",
    })

    useEffect(() => {
        if (classData) {
            setFormData({
                grade: classData.grade,
                section: classData.section,
                classTeacherId: classData.classTeacherId,
                room: classData.room,
                totalStudents: classData.totalStudents.toString(),
            })
        }
    }, [classData])

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const selectedTeacher = availableTeachers.find((t) => t.id === formData.classTeacherId)

        if (formData.grade && formData.section && formData.classTeacherId && formData.room && selectedTeacher) {
            const updatedData = {
                grade: formData.grade,
                section: formData.section,
                className: `${formData.grade.split(" ")[1]}-${formData.section}`,
                classTeacher: selectedTeacher.name,
                classTeacherId: formData.classTeacherId,
                room: formData.room,
                totalStudents: Number.parseInt(formData.totalStudents) || 0,
            }

            onEdit(classData.id, updatedData)
        }
    }

    const handleClose = () => {
        onClose()
    }

    if (!classData) return null

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Class</DialogTitle>
                    <DialogDescription>
                        Update class information and assign a class teacher for Class {classData.className}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="grade">Grade *</Label>
                            <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {grades.map((grade) => (
                                        <SelectItem key={grade} value={grade}>
                                            {grade}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="section">Section *</Label>
                            <Select value={formData.section} onValueChange={(value) => handleInputChange("section", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select section" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sections.map((section) => (
                                        <SelectItem key={section} value={section}>
                                            Section {section}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="classTeacher">Class Teacher *</Label>
                        <Select
                            value={formData.classTeacherId}
                            onValueChange={(value) => handleInputChange("classTeacherId", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select class teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableTeachers.map((teacher) => (
                                    <SelectItem key={teacher.id} value={teacher.id}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{teacher.name}</span>
                                            <span className="text-sm text-gray-500">{teacher.department}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="room">Room *</Label>
                            <Select value={formData.room} onValueChange={(value) => handleInputChange("room", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select room" />
                                </SelectTrigger>
                                <SelectContent>
                                    {rooms.map((room) => (
                                        <SelectItem key={room} value={room}>
                                            {room}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="totalStudents">Total Students</Label>
                            <Input
                                id="totalStudents"
                                type="number"
                                value={formData.totalStudents}
                                onChange={(e) => handleInputChange("totalStudents", e.target.value)}
                                placeholder="Enter number of students"
                                min="0"
                                max="50"
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Current Class Information</h4>
                        <div className="text-sm text-blue-800 space-y-1">
                            <p>
                                <strong>Current Class:</strong> {classData.className}
                            </p>
                            <p>
                                <strong>Current Teacher:</strong> {classData.classTeacher}
                            </p>
                            <p>
                                <strong>Current Room:</strong> {classData.room}
                            </p>
                            <p>
                                <strong>Current Students:</strong> {classData.totalStudents}
                            </p>
                            <p>
                                <strong>Subject Assignments:</strong> {classData.subjects.length} subjects
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Update Class</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
