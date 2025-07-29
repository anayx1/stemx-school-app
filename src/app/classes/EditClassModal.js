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
import { AlertCircle, CheckCircle } from "lucide-react"
import { updateClass } from "@/lib/classes/data"

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
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (classData) {
            setFormData({
                grade: classData.grade || "",
                section: classData.section || "",
                classTeacherId: classData.classTeacherId || "",
                room: classData.room || "",
                totalStudents: classData.totalStudents ? classData.totalStudents.toString() : "",
            })
            setError("")
            setSuccess("")
        }
    }, [classData])

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
        if (error) setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")

        // Basic validation
        if (!formData.grade || !formData.section || !formData.classTeacherId || !formData.room) {
            setError("All fields marked with * are required.")
            setIsLoading(false)
            return
        }

        const selectedTeacher = availableTeachers.find((t) => t.id === formData.classTeacherId)
        if (!selectedTeacher) {
            setError("Selected teacher is invalid.")
            setIsLoading(false)
            return
        }

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("grade", formData.grade)
            formDataToSend.append("section", formData.section)
            formDataToSend.append("classTeacherId", formData.classTeacherId)
            formDataToSend.append("room", formData.room)
            formDataToSend.append("totalStudents", formData.totalStudents)

            const result = await updateClass(classData.id, formDataToSend)

            if (result.success) {
                setSuccess("Class updated successfully!")
                setTimeout(() => {
                    handleClose()
                    if (onEdit) {
                        // Reconstruct the class data to pass back, similar to how it's done in the original component
                        const updatedData = {
                            ...classData, // Keep existing data
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
                }, 1500)
            } else {
                setError(result.error)
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        onClose()
        // Reset form data only if modal is closed, not on success to allow success message to show
        if (!success) {
            setFormData({
                grade: "",
                section: "",
                classTeacherId: "",
                room: "",
                totalStudents: "",
            })
        }
        setError("")
        setSuccess("")
        setIsLoading(false)
    }

    if (!classData) return null

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto border-0 shadow-lg rounded-xl p-0">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-t-xl border-b">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold text-slate-800">Edit Class</DialogTitle>
                        <DialogDescription className="text-slate-600">
                            Update class information and assign a class teacher for Class {classData.className}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="flex items-center gap-3 p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-800 animate-fadeIn">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-3 p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-fadeIn">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-medium">{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="grade" className="text-sm font-medium text-slate-700">
                                    Grade *
                                </Label>
                                <Select
                                    value={formData.grade}
                                    onValueChange={(value) => handleInputChange("grade", value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
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
                                <Label htmlFor="section" className="text-sm font-medium text-slate-700">
                                    Section *
                                </Label>
                                <Select
                                    value={formData.section}
                                    onValueChange={(value) => handleInputChange("section", value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
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
                            <Label htmlFor="classTeacher" className="text-sm font-medium text-slate-700">
                                Class Teacher *
                            </Label>
                            <Select
                                value={formData.classTeacherId}
                                onValueChange={(value) => handleInputChange("classTeacherId", value)}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
                                    <SelectValue placeholder="Select class teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableTeachers.map((teacher) => (
                                        <SelectItem key={teacher.id} value={teacher.id}>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{teacher.name}</span>
                                                <span className="text-sm text-slate-500">{teacher.department}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="room" className="text-sm font-medium text-slate-700">
                                    Room *
                                </Label>
                                <Select
                                    value={formData.room}
                                    onValueChange={(value) => handleInputChange("room", value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
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
                                <Label htmlFor="totalStudents" className="text-sm font-medium text-slate-700">
                                    Total Students
                                </Label>
                                <Input
                                    id="totalStudents"
                                    type="number"
                                    value={formData.totalStudents}
                                    onChange={(e) => handleInputChange("totalStudents", e.target.value)}
                                    placeholder="Enter number of students"
                                    min="0"
                                    max="50"
                                    disabled={isLoading}
                                    className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                            <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                                <span className="inline-block w-1.5 h-4 bg-blue-500 rounded-sm mr-2"></span>
                                Current Class Information
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="text-sm">
                                    <p className="text-slate-500 mb-1">Current Class</p>
                                    <p className="font-medium text-slate-800">{classData.className || "N/A"}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-slate-500 mb-1">Current Teacher</p>
                                    <p className="font-medium text-slate-800">{classData.classTeacher || "N/A"}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-slate-500 mb-1">Current Room</p>
                                    <p className="font-medium text-slate-800">{classData.room || "N/A"}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-slate-500 mb-1">Current Students</p>
                                    <p className="font-medium text-slate-800">{classData.totalStudents || "N/A"}</p>
                                </div>
                                <div className="text-sm col-span-2">
                                    <p className="text-slate-500 mb-1">Subject Assignments</p>
                                    <p className="font-medium text-slate-800">
                                        {classData.subjects ? `${classData.subjects.length} subjects` : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                                className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Class"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
