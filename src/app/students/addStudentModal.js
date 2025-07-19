    
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
import { useToast } from "@/components/ui/use-toast"
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

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})

        try {
            const result = await addStudent(formData, schoolUserId)
            toast({
                title: "Success",
                description: "Student added successfully.",
            })
            onAdd(result)
            onClose()
        } catch (error) {
            try {
                const errorResponse = JSON.parse(error.message)
                setErrors(errorResponse)
                toast({
                    title: "Validation Error",
                    description: "Please check the form for errors.",
                    variant: "destructive",
                })
            } catch (e) {
                toast({
                    title: "Error",
                    description: error.message || "An unexpected error occurred.",
                    variant: "destructive",
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>Fill in the student's information to add them to the system.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name *</Label>
                            <Input
                                id="full_name"
                                value={formData.full_name}
                                onChange={(e) => handleInputChange("full_name", e.target.value)}
                                placeholder="Enter full name"
                                required
                            />
                            {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name[0]}</p>}
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
                            {errors.email && <p className="text-red-500 text-xs">{errors.email[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="roll_number">Roll Number *</Label>
                            <Input
                                id="roll_number"
                                value={formData.roll_number}
                                onChange={(e) => handleInputChange("roll_number", e.target.value)}
                                placeholder="Enter roll number"
                                required
                            />
                            {errors.roll_number && <p className="text-red-500 text-xs">{errors.roll_number[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="guardian_name">Guardian Name *</Label>
                            <Input
                                id="guardian_name"
                                value={formData.guardian_name}
                                onChange={(e) => handleInputChange("guardian_name", e.target.value)}
                                placeholder="Enter guardian name"
                                required
                            />
                            {errors.guardian_name && <p className="text-red-500 text-xs">{errors.guardian_name[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact_number">Contact Number *</Label>
                            <Input
                                id="contact_number"
                                value={formData.contact_number}
                                onChange={(e) => handleInputChange("contact_number", e.target.value)}
                                placeholder="Enter contact number"
                                required
                            />
                            {errors.contact_number && <p className="text-red-500 text-xs">{errors.contact_number[0]}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Student"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

