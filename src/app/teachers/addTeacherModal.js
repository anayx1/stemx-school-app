"use client"

import { useState, useTransition } from "react"
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
import { X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createTeacher } from "@/lib/Teacher/action"

export default function AddTeacherModal({ isOpen, onClose }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        subject_specialization: "",
        qualification: "",
        date_of_birth: "",
        gender: "",
        address: "",
        experience_years: "",
        assigned_class_ids: [],
    })
    const [currentClassId, setCurrentClassId] = useState("")

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const addClassId = () => {
        const classId = Number.parseInt(currentClassId)
        if (currentClassId.trim() && !isNaN(classId) && !formData.assigned_class_ids.includes(classId)) {
            setFormData((prev) => ({
                ...prev,
                assigned_class_ids: [...prev.assigned_class_ids, classId],
            }))
            setCurrentClassId("")
        }
    }

    const removeClassId = (classIdToRemove) => {
        setFormData((prev) => ({
            ...prev,
            assigned_class_ids: prev.assigned_class_ids.filter((id) => id !== classIdToRemove),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (!formData.full_name || !formData.email || !formData.subject_specialization) {
            setError("Please fill in all required fields")
            return
        }

        startTransition(async () => {
            try {
                const teacherData = {
                    ...formData,
                    experience_years: Number.parseInt(formData.experience_years) || 0,
                }

                await createTeacher(teacherData)
                handleClose()
                router.refresh() // Refresh the page to show new data
            } catch (err) {
                setError(err.message || "Failed to create teacher")
            }
        })
    }

    const handleClose = () => {
        setFormData({
            full_name: "",
            email: "",
            phone_number: "",
            subject_specialization: "",
            qualification: "",
            date_of_birth: "",
            gender: "",
            address: "",
            experience_years: "",
            assigned_class_ids: [],
        })
        setCurrentClassId("")
        setError("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Teacher</DialogTitle>
                    <DialogDescription>Fill in the teacher's information to add them to the system.</DialogDescription>
                </DialogHeader>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name *</Label>
                            <Input
                                id="full_name"
                                value={formData.full_name}
                                onChange={(e) => handleInputChange("full_name", e.target.value)}
                                placeholder="Enter full name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="Enter email address"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input
                                id="phone_number"
                                value={formData.phone_number}
                                onChange={(e) => handleInputChange("phone_number", e.target.value)}
                                placeholder="+1 234-567-8900"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject_specialization">Subject Specialization *</Label>
                            <Input
                                id="subject_specialization"
                                value={formData.subject_specialization}
                                onChange={(e) => handleInputChange("subject_specialization", e.target.value)}
                                placeholder="e.g., Mathematics, Science"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="qualification">Qualification</Label>
                            <Input
                                id="qualification"
                                value={formData.qualification}
                                onChange={(e) => handleInputChange("qualification", e.target.value)}
                                placeholder="e.g., B.Ed, M.Sc"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience_years">Experience (Years)</Label>
                            <Input
                                id="experience_years"
                                type="number"
                                value={formData.experience_years}
                                onChange={(e) => handleInputChange("experience_years", e.target.value)}
                                placeholder="e.g., 5"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Input
                                id="date_of_birth"
                                type="date"
                                value={formData.date_of_birth}
                                onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="Enter full address"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="assigned_class_ids">Assigned Class IDs</Label>
                        <div className="flex gap-2">
                            <Input
                                id="assigned_class_ids"
                                type="number"
                                value={currentClassId}
                                onChange={(e) => setCurrentClassId(e.target.value)}
                                placeholder="Enter class ID"
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addClassId())}
                            />
                            <Button type="button" onClick={addClassId} variant="outline">
                                Add
                            </Button>
                        </div>
                        {formData.assigned_class_ids.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.assigned_class_ids.map((classId, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        Class {classId}
                                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeClassId(classId)} />
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {isPending ? "Creating..." : "Add Teacher"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
