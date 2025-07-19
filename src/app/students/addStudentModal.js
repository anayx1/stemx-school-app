
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

export default function AddStudentModal({ isOpen, onClose, onAdd }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        grade: "",
        class: "",
        status: "Active",
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.name && formData.email && formData.grade && formData.class) {
            onAdd(formData)
            setFormData({
                name: "",
                email: "",
                phone: "",
                grade: "",
                class: "",
                status: "Active",
            })
        }
    }

    const handleClose = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            grade: "",
            class: "",
            status: "Active",
        })
        onClose()
    }

    const getClassOptions = (grade) => {
        if (!grade) return []
        const gradeNumber = grade.split(" ")[1]
        return [`${gradeNumber}-A`, `${gradeNumber}-B`, `${gradeNumber}-C`]
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>Fill in the student's information to add them to the system.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
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
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder="+1 234-567-8900"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="grade">Grade *</Label>
                            <Select
                                value={formData.grade}
                                onValueChange={(value) => {
                                    handleInputChange("grade", value)
                                    handleInputChange("class", "") // Reset class when grade changes
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Grade 9">Grade 9</SelectItem>
                                    <SelectItem value="Grade 10">Grade 10</SelectItem>
                                    <SelectItem value="Grade 11">Grade 11</SelectItem>
                                    <SelectItem value="Grade 12">Grade 12</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="class">Class *</Label>
                            <Select
                                value={formData.class}
                                onValueChange={(value) => handleInputChange("class", value)}
                                disabled={!formData.grade}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getClassOptions(formData.grade).map((classOption) => (
                                        <SelectItem key={classOption} value={classOption}>
                                            {classOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Student</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


/*

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
import { useToast } from "@/components/ui/use-toast"

export default function AddStudentModal({ isOpen, onClose, onAdd }) {
    const { toast } = useToast()

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        roll_number: "",
        guardian_name: "",
        contact_number: "",
        date_of_birth: "",
        gender: "",
        address: "",
        admission_date: "",
    })

    const [loading, setLoading] = useState(false)

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const validateForm = () => {
        const requiredFields = ["full_name", "email", "roll_number", "guardian_name", "contact_number"]
        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === "") {
                toast({
                    title: "Validation Error",
                    description: `${field.replace(/_/g, " ")} is required.`,
                    variant: "destructive",
                })
                return false
            }
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setLoading(true)
        try {
            const res = await fetch("/api/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const errorData = await res.json()
                toast({
                    title: "Error",
                    description: errorData.error || "Failed to add student",
                    variant: "destructive",
                })
                setLoading(false)
                return
            }

            const result = await res.json()
            toast({
                title: "Success",
                description: "Student added successfully.",
            })
            onAdd(result)
            setFormData({
                full_name: "",
                email: "",
                roll_number: "",
                guardian_name: "",
                contact_number: "",
                date_of_birth: "",
                gender: "",
                address: "",
                admission_date: "",
            })
            onClose()
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setFormData({
            full_name: "",
            email: "",
            roll_number: "",
            guardian_name: "",
            contact_number: "",
            date_of_birth: "",
            gender: "",
            address: "",
            admission_date: "",
        })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>Fill in the student's information to add them to the system.</DialogDescription>
                </DialogHeader>
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
                            <Label htmlFor="roll_number">Roll Number *</Label>
                            <Input
                                id="roll_number"
                                value={formData.roll_number}
                                onChange={(e) => handleInputChange("roll_number", e.target.value)}
                                placeholder="Enter roll number"
                                required
                            />
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
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact_number">Contact Number *</Label>
                            <Input
                                id="contact_number"
                                value={formData.contact_number}
                                onChange={(e) => handleInputChange("contact_number", e.target.value)}
                                placeholder="Enter contact number"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Input
                                id="date_of_birth"
                                type="date"
                                value={formData.date_of_birth}
                                onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => handleInputChange("gender", value)}
                            >
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
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                placeholder="Enter address"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="admission_date">Admission Date</Label>
                        <Input
                            id="admission_date"
                            type="date"
                            value={formData.admission_date}
                            onChange={(e) => handleInputChange("admission_date", e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
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
*/
