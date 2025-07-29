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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, AlertCircle, CheckCircle, Loader2, Plus, BookOpen } from "lucide-react"
import { createClass } from "@/lib/classes/action"

const commonSubjects = [
    { name: "Mathematics", code: "MATH", description: "Basic and advanced mathematical concepts" },
    { name: "Science", code: "SCI", description: "General science and scientific methods" },
    { name: "English", code: "ENG", description: "English language and literature" },
    { name: "History", code: "HIST", description: "World and local history" },
    { name: "Geography", code: "GEO", description: "Physical and human geography" },
    { name: "Physics", code: "PHY", description: "Physics principles and applications" },
    { name: "Chemistry", code: "CHEM", description: "Chemical reactions and properties" },
    { name: "Biology", code: "BIO", description: "Life sciences and biological processes" },
    { name: "Literature", code: "LIT", description: "Literary works and analysis" },
    { name: "Physical Education", code: "PE", description: "Physical fitness and sports" },
    { name: "Art", code: "ART", description: "Visual arts and creative expression" },
    { name: "Music", code: "MUS", description: "Music theory and performance" },
    { name: "Computer Science", code: "CS", description: "Programming and computer systems" },
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
    const [progress, setProgress] = useState(0)

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
            setTimeout(() => setError(""), 3000)
            return
        }
        setSubjects((prev) => [...prev, subjectData])
        setError("")
    }

    const removeSubject = (code) => {
        setSubjects((prev) => prev.filter((s) => s.code !== code))
    }

    const validateForm = () => {
        if (!formData.className.trim()) {
            return "Class name is required"
        }
        if (formData.className.trim().length < 2) {
            return "Class name must be at least 2 characters long"
        }
        if (!formData.section.trim()) {
            return "Section is required"
        }
        if (!formData.academicYear) {
            return "Academic year is required"
        }
        if (subjects.length === 0) {
            return "At least one subject is required"
        }
        return null
    }

    const simulateProgress = () => {
        setProgress(0)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval)
                    return 90
                }
                return prev + 10
            })
        }, 200)
        return interval
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate form
        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            return
        }

        setIsLoading(true)
        setError("")
        setSuccess("")

        const progressInterval = simulateProgress()

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

            clearInterval(progressInterval)
            setProgress(100)

            if (result.success) {
                setSuccess(result.message || "Class created successfully!")

                // Auto-close after success
                setTimeout(() => {
                    handleClose()
                    if (onSuccess) onSuccess(result.data)
                }, 2000)
            } else {
                setError(result.error)
                setProgress(0)
            }
        } catch (err) {
            clearInterval(progressInterval)
            setProgress(0)
            setError("An unexpected error occurred. Please try again.")
            console.error("Form submission error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        if (isLoading) return // Prevent closing while loading

        setFormData({
            className: "",
            section: "",
            academicYear: "",
        })
        setSubjects([])
        setError("")
        setSuccess("")
        setIsLoading(false)
        setProgress(0)
        onClose()
    }

    const getFormCompletionPercentage = () => {
        let completed = 0
        const total = 4 // className, section, academicYear, subjects

        if (formData.className.trim()) completed++
        if (formData.section.trim()) completed++
        if (formData.academicYear) completed++
        if (subjects.length > 0) completed++

        return Math.round((completed / total) * 100)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden border-0 shadow-2xl rounded-2xl p-0">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2 ">
                            Create New Class
                        </DialogTitle>
                        <DialogDescription className="text-blue-100 mt-2 text-left">
                            Set up a new class with subjects for the academic year
                        </DialogDescription>
                    </DialogHeader>

                    {/* Form completion indicator */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-blue-100 mb-2">
                            <span>Form Completion</span>
                            <span>{getFormCompletionPercentage()}%</span>
                        </div>
                        <Progress value={getFormCompletionPercentage()} className="h-2 bg-blue-500/30" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Loading Progress */}
                    {isLoading && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                                <span className="font-medium text-blue-800">Creating class...</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    )}

                    {/* Error Alert */}
                    {error && (
                        <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-800 animate-in slide-in-from-top-2">
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Error</p>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Success Alert */}
                    {success && (
                        <div className="flex items-start gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-in slide-in-from-top-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Success!</p>
                                <p className="text-sm mt-1">{success}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="className" className="text-sm font-medium text-gray-700">
                                        Class Name *
                                    </Label>
                                    <Input
                                        id="className"
                                        value={formData.className}
                                        onChange={(e) => handleInputChange("className", e.target.value)}
                                        placeholder="e.g., Grade 10, Class A"
                                        required
                                        disabled={isLoading}
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="section" className="text-sm font-medium text-gray-700">
                                        Section *
                                    </Label>
                                    <Input
                                        id="section"
                                        value={formData.section}
                                        onChange={(e) => handleInputChange("section", e.target.value)}
                                        placeholder="e.g., A, B, C"
                                        required
                                        disabled={isLoading}
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="academicYear" className="text-sm font-medium text-gray-700">
                                    Academic Year *
                                </Label>
                                <Select
                                    value={formData.academicYear}
                                    onValueChange={(value) => handleInputChange("academicYear", value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
                        </div>

                        {/* Subjects Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Subjects *</h3>
                                <Badge variant="secondary" className="text-xs">
                                    {subjects.length} selected
                                </Badge>
                            </div>

                            <Select
                                onValueChange={(value) => {
                                    const subject = commonSubjects.find((s) => s.code === value)
                                    if (subject) addSubject(subject)
                                }}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <SelectValue placeholder="Add subjects to the class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {commonSubjects
                                        .filter((subject) => !subjects.find((s) => s.code === subject.code))
                                        .map((subject) => (
                                            <SelectItem key={subject.code} value={subject.code}>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{subject.name}</span>
                                                    <span className="text-xs text-gray-500">{subject.code}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>

                            {/* Selected Subjects */}
                            {subjects.length > 0 && (
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-sm font-medium text-gray-700 mb-3">Selected Subjects:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {subjects.map((subject) => (
                                            <Badge
                                                key={subject.code}
                                                variant="secondary"
                                                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-medium">{subject.name}</span>
                                                <span className="text-xs text-gray-500">({subject.code})</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubject(subject.code)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                                                    disabled={isLoading}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="inline-block w-1.5 h-4 bg-blue-500 rounded-sm mr-2"></span>
                                Class Summary
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-sm">
                                    <p className="text-gray-500 mb-1">Class</p>
                                    <p className="font-medium text-gray-800">
                                        {formData.className || <span className="text-gray-400">Not specified</span>}
                                    </p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 mb-1">Section</p>
                                    <p className="font-medium text-gray-800">
                                        {formData.section || <span className="text-gray-400">Not specified</span>}
                                    </p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 mb-1">Academic Year</p>
                                    <p className="font-medium text-gray-800">
                                        {formData.academicYear || <span className="text-gray-400">Not specified</span>}
                                    </p>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 mb-1">Subjects</p>
                                    <p className="font-medium text-gray-800">
                                        {subjects.length > 0 ? (
                                            `${subjects.length} subject${subjects.length > 1 ? "s" : ""} selected`
                                        ) : (
                                            <span className="text-gray-400">None selected</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <DialogFooter className="p-6 bg-gray-50 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="transition-all duration-200 bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || getFormCompletionPercentage() < 100}
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 min-w-[120px]"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                Creating...
                            </div>
                        ) : (
                            "Create Class"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
