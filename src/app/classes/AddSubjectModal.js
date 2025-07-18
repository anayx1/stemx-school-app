"use client"

import { useState } from "react"
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

const commonSubjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Literature",
    "Algebra",
    "Calculus",
    "Geometry",
    "World History",
    "American History",
    "Modern History",
    "Advanced English",
    "Creative Writing",
    "Grammar",
    "Physical Education",
    "Art",
    "Music",
    "Computer Science",
]

export default function AddSubjectAssignmentModal({ isOpen, onClose, onAdd, classData, availableTeachers }) {
    const [formData, setFormData] = useState({
        subject: "",
        teacherId: "",
        customSubject: "",
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = formData.subject === "custom" ? formData.customSubject : formData.subject
        const selectedTeacher = availableTeachers.find((t) => t.id === formData.teacherId)

        if (subject && formData.teacherId && selectedTeacher) {
            onAdd(classData.id, {
                subject,
                teacherId: formData.teacherId,
                teacherName: selectedTeacher.name,
            })
            handleClose()
        }
    }

    const handleClose = () => {
        setFormData({
            subject: "",
            teacherId: "",
            customSubject: "",
        })
        onClose()
    }

    if (!classData) return null

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Subject Assignment</DialogTitle>
                    <DialogDescription>Assign a teacher to teach a subject in Class {classData.className}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {commonSubjects.map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                        {subject}
                                    </SelectItem>
                                ))}
                                <SelectItem value="custom">Custom Subject...</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {formData.subject === "custom" && (
                        <div className="space-y-2">
                            <Label htmlFor="customSubject">Custom Subject Name *</Label>
                            <Input
                                id="customSubject"
                                value={formData.customSubject}
                                onChange={(e) => handleInputChange("customSubject", e.target.value)}
                                placeholder="Enter custom subject name"
                                required
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="teacher">Teacher *</Label>
                        <Select value={formData.teacherId} onValueChange={(value) => handleInputChange("teacherId", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a teacher" />
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

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Assignment Summary</h4>
                        <div className="text-sm text-blue-800 space-y-1">
                            <p>
                                <strong>Class:</strong> {classData.className}
                            </p>
                            <p>
                                <strong>Class Teacher:</strong> {classData.classTeacher}
                            </p>
                            <p>
                                <strong>Room:</strong> {classData.room}
                            </p>
                            <p>
                                <strong>Students:</strong> {classData.totalStudents}
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Assignment</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
