"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useToast } from "@/components/ui/use-toast"
import { User, Mail, Hash, Users, Phone, AlertCircle, CheckCircle, Loader2, UserPlus, Eye, EyeOff } from "lucide-react"
import { addStudent } from "@/lib/actions/students"

export default function AddStudentModal({ isOpen, onClose, onAdd, schoolUserId }) {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        roll_number: "",
        guardian_name: "",
        contact_number: "",
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [progress, setProgress] = useState(0)

    const fieldIcons = {
        full_name: User,
        email: Mail,
        roll_number: Hash,
        guardian_name: Users,
        contact_number: Phone,
    }

    const fieldLabels = {
        full_name: "Full Name",
        email: "Email Address",
        roll_number: "Roll Number",
        guardian_name: "Guardian Name",
        contact_number: "Contact Number",
    }

    const validateField = (field, value) => {
        const validationErrors = {}

        switch (field) {
            case "full_name":
                if (!value.trim()) {
                    validationErrors[field] = "Full name is required"
                } else if (value.trim().length < 2) {
                    validationErrors[field] = "Full name must be at least 2 characters"
                } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    validationErrors[field] = "Full name can only contain letters and spaces"
                }
                break

            case "email":
                if (!value.trim()) {
                    validationErrors[field] = "Email is required"
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                    validationErrors[field] = "Please enter a valid email address"
                }
                break

            case "roll_number":
                if (!value.trim()) {
                    validationErrors[field] = "Roll number is required"
                } else if (value.trim().length < 1) {
                    validationErrors[field] = "Roll number cannot be empty"
                }
                break

            case "guardian_name":
                if (!value.trim()) {
                    validationErrors[field] = "Guardian name is required"
                } else if (value.trim().length < 2) {
                    validationErrors[field] = "Guardian name must be at least 2 characters"
                } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    validationErrors[field] = "Guardian name can only contain letters and spaces"
                }
                break

            case "contact_number":
                if (!value.trim()) {
                    validationErrors[field] = "Contact number is required"
                } else if (!/^\+?[\d\s\-$$$$]{10,15}$/.test(value.trim())) {
                    validationErrors[field] = "Please enter a valid contact number (10-15 digits)"
                }
                break

            default:
                break
        }

        return validationErrors[field] || null
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Clear server errors when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }))
        }

        // Real-time validation for touched fields
        if (touched[field]) {
            const fieldError = validateField(field, value)
            setErrors((prev) => ({ ...prev, [field]: fieldError }))
        }
    }

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
        const fieldError = validateField(field, formData[field])
        setErrors((prev) => ({ ...prev, [field]: fieldError }))
    }

    const getFormCompletionPercentage = () => {
        const fields = Object.keys(formData)
        const completedFields = fields.filter((field) => formData[field].trim() !== "")
        return Math.round((completedFields.length / fields.length) * 100)
    }

    const simulateProgress = () => {
        setProgress(0)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval)
                    return 90
                }
                return prev + 15
            })
        }, 200)
        return interval
    }

    const validateAllFields = () => {
        const validationErrors = {}
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field])
            if (error) {
                validationErrors[field] = error
            }
        })
        return validationErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate all fields
        const validationErrors = validateAllFields()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setTouched(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}))
            toast({
                title: "Validation Error",
                description: "Please fix the errors in the form before submitting.",
                variant: "destructive",
            })
            return
        }

        setLoading(true)
        setErrors({})

        const progressInterval = simulateProgress()

        try {
            const result = await addStudent(formData, schoolUserId)

            clearInterval(progressInterval)
            setProgress(100)

            toast({
                title: "Success!",
                description: "Student has been added successfully.",
                variant: "default",
            })

            // Auto-close after success
            setTimeout(() => {
                handleClose()
                if (onAdd) onAdd(result)
            }, 1500)
        } catch (error) {
            clearInterval(progressInterval)
            setProgress(0)

            try {
                const errorResponse = JSON.parse(error.message)

                // Handle server validation errors
                const serverErrors = {}
                Object.keys(errorResponse).forEach((field) => {
                    if (Array.isArray(errorResponse[field])) {
                        serverErrors[field] = errorResponse[field][0]
                    } else {
                        serverErrors[field] = errorResponse[field]
                    }
                })

                setErrors(serverErrors)
                toast({
                    title: "Validation Error",
                    description: "Please check the form for errors and try again.",
                    variant: "destructive",
                })
            } catch (parseError) {
                // Handle general errors
                toast({
                    title: "Error",
                    description: error.message || "An unexpected error occurred. Please try again.",
                    variant: "destructive",
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (loading) return // Prevent closing while loading

        setFormData({
            full_name: "",
            email: "",
            roll_number: "",
            guardian_name: "",
            contact_number: "",
        })
        setErrors({})
        setTouched({})
        setProgress(0)
        onClose()
    }

    const isFormValid = () => {
        return (
            Object.keys(formData).every((field) => formData[field].trim() !== "") &&
            Object.keys(errors).every((field) => !errors[field])
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] border-0 shadow-2xl rounded-2xl p-0 flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            {/* <UserPlus className="h-6 w-6" /> */}
                            Add New Student
                        </DialogTitle>
                        <DialogDescription className="text-green-100 mt-2 text-left">
                            Fill in the student's information to add them to the system
                        </DialogDescription>
                    </DialogHeader>

                    {/* Form completion indicator */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-green-100 mb-2">
                            <span>Form Completion</span>
                            <span>{getFormCompletionPercentage()}%</span>
                        </div>
                        <Progress value={getFormCompletionPercentage()} className="h-2 bg-green-500/30" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {/* Loading Progress */}
                    {loading && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <Loader2 className="h-5 w-5 text-green-600 animate-spin" />
                                <span className="font-medium text-green-800">Adding student...</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(formData).map(([field, value]) => {
                                const Icon = fieldIcons[field]
                                const hasError = errors[field]
                                const isValid = touched[field] && !hasError && value.trim() !== ""

                                return (
                                    <div key={field} className="space-y-2">
                                        <Label htmlFor={field} className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Icon className="h-4 w-4 text-gray-500" />
                                            {fieldLabels[field]} *
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id={field}
                                                type={field === "email" ? "email" : field === "contact_number" ? "tel" : "text"}
                                                value={value}
                                                onChange={(e) => handleInputChange(field, e.target.value)}
                                                onBlur={() => handleBlur(field)}
                                                placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                                                required
                                                disabled={loading}
                                                className={`transition-all duration-200 pr-10 ${hasError
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : isValid
                                                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                                                        : "focus:border-blue-500 focus:ring-blue-200"
                                                    }`}
                                            />

                                            {/* Status Icon */}
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                {hasError && <AlertCircle className="h-4 w-4 text-red-500" />}
                                                {isValid && <CheckCircle className="h-4 w-4 text-green-500" />}
                                            </div>
                                        </div>

                                        {/* Error Message */}
                                        {hasError && (
                                            <div className="flex items-start gap-2 text-red-600 text-xs animate-in slide-in-from-top-1">
                                                <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                                <span>{hasError}</span>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Preview Toggle */}


                        {/* Form Status */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={isFormValid() ? "default" : "secondary"}
                                    className={isFormValid() ? "bg-green-100 text-green-800" : ""}
                                >
                                    {isFormValid() ? "Ready to Submit" : "Form Incomplete"}
                                </Badge>
                            </div>
                            <div className="text-sm text-gray-600">
                                {Object.keys(formData).filter((field) => formData[field].trim() !== "").length} of{" "}
                                {Object.keys(formData).length} fields completed
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <DialogFooter className="p-6 bg-gray-50 border-t flex-shrink-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={loading}
                        className="transition-all duration-200 bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !isFormValid()}
                        className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200 min-w-[140px]"
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                Adding...
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Add Student
                            </div>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
