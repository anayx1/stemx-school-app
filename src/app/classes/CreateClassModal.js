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
import { X, AlertCircle, CheckCircle } from "lucide-react"
import { createClass } from "@/lib/classes/action"

const commonSubjects = [
    { name: "Mathematics", code: "MATH" },
    { name: "Science", code: "SCI" },
    { name: "English", code: "ENG" },
    { name: "History", code: "HIST" },
    { name: "Geography", code: "GEO" },
    { name: "Physics", code: "PHY" },
    { name: "Chemistry", code: "CHEM" },
    { name: "Biology", code: "BIO" },
    { name: "Literature", code: "LIT" },
    { name: "Physical Education", code: "PE" },
    { name: "Art", code: "ART" },
    { name: "Music", code: "MUS" },
    { name: "Computer Science", code: "CS" },
]

const currentYear = new Date().getFullYear()
const academicYears = [
    `${currentYear}-${currentYear + 1}`,
    `${currentYear + 1}-${currentYear + 2}`,
    `${currentYear - 1}-${currentYear}`,
]

export default function CreateClassModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        className: "",
        section: "",
        academicYear: "",
    })
    const [subjects, setSubjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
        // Clear error when user starts typing
        if (error) setError("")
    }

    const addSubject = (subjectData) => {
        const exists = subjects.find((s) => s.code === subjectData.code)
        if (exists) {
            setError("Subject already added")
            return
        }
        setSubjects((prev) => [...prev, subjectData])
        setError("")
    }

    const removeSubject = (code) => {
        setSubjects((prev) => prev.filter((s) => s.code !== code))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")

        // Validation
        if (!formData.className.trim()) {
            setError("Class name is required")
            setIsLoading(false)
            return
        }
        if (!formData.section.trim()) {
            setError("Section is required")
            setIsLoading(false)
            return
        }
        if (!formData.academicYear) {
            setError("Academic year is required")
            setIsLoading(false)
            return
        }
        if (subjects.length === 0) {
            setError("At least one subject is required")
            setIsLoading(false)
            return
        }

        try {
            const formDataToSend = new FormData()
            formDataToSend.append("className", formData.className.trim())
            formDataToSend.append("section", formData.section.trim())
            formDataToSend.append("academicYear", formData.academicYear)
            formDataToSend.append(
                "subjects",
                JSON.stringify(
                    subjects.map((s) => ({
                        name: s.name,
                        code: s.code,
                        description: s.description || "",
                    })),
                ),
            )

            const result = await createClass(formDataToSend)

            if (result.success) {
                setSuccess("Class created successfully!")
                setTimeout(() => {
                    handleClose()
                    if (onSuccess) onSuccess(result.data)
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
        setFormData({
            className: "",
            section: "",
            academicYear: "",
        })
        setSubjects([])
        setError("")
        setSuccess("")
        setIsLoading(false)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto border-0 shadow-lg rounded-xl p-0">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-t-xl border-b">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold text-slate-800">Create New Class</DialogTitle>
                        <DialogDescription className="text-slate-600">
                            Add a new class with subjects for the academic year
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
                                <Label htmlFor="className" className="text-sm font-medium text-slate-700">
                                    Class Name *
                                </Label>
                                <Input
                                    id="className"
                                    value={formData.className}
                                    onChange={(e) => handleInputChange("className", e.target.value)}
                                    placeholder="e.g., Grade 10, Class A"
                                    required
                                    disabled={isLoading}
                                    className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="section" className="text-sm font-medium text-slate-700">
                                    Section *
                                </Label>
                                <Input
                                    id="section"
                                    value={formData.section}
                                    onChange={(e) => handleInputChange("section", e.target.value)}
                                    placeholder="e.g., A, B, C"
                                    required
                                    disabled={isLoading}
                                    className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="academicYear" className="text-sm font-medium text-slate-700">
                                Academic Year *
                            </Label>
                            <Select
                                value={formData.academicYear}
                                onValueChange={(value) => handleInputChange("academicYear", value)}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
                                    <SelectValue placeholder="Select academic year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {academicYears.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-slate-700">Subjects *</Label>
                                <span className="text-xs text-slate-500">{subjects.length} selected</span>
                            </div>
                            <Select
                                onValueChange={(value) => {
                                    const subject = commonSubjects.find((s) => s.code === value)
                                    if (subject) addSubject(subject)
                                }}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all">
                                    <SelectValue placeholder="Add subjects" />
                                </SelectTrigger>
                                <SelectContent>
                                    {commonSubjects.map((subject) => (
                                        <SelectItem key={subject.code} value={subject.code}>
                                            {subject.name} ({subject.code})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {subjects.length > 0 && (
                                <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex flex-wrap gap-2">
                                        {subjects.map((subject) => (
                                            <div
                                                key={subject.code}
                                                className="flex items-center gap-1 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm shadow-sm hover:bg-slate-50 transition-colors group"
                                            >
                                                <span className="font-medium">{subject.name}</span>
                                                <span className="text-xs text-slate-500 mr-1">({subject.code})</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubject(subject.code)}
                                                    className="text-slate-400 hover:text-red-500 rounded-full p-0.5 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                            <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                                <span className="inline-block w-1.5 h-4 bg-blue-500 rounded-sm mr-2"></span>
                                Class Summary
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="text-sm">
                                    <p className="text-slate-500 mb-1">Class</p>
                                    <p className="font-medium text-slate-800">{formData.className || "Not specified"}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-slate-500 mb-1">Section</p>
                                    <p className="font-medium text-slate-800">{formData.section || "Not specified"}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-slate-500 mb-1">Academic Year</p>
                                    <p className="font-medium text-slate-800">{formData.academicYear || "Not specified"}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-slate-500 mb-1">Subjects</p>
                                    <p className="font-medium text-slate-800">
                                        {subjects.length > 0 ? `${subjects.length} subjects selected` : "None selected"}
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
                                        Creating...
                                    </div>
                                ) : (
                                    "Create Class"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
