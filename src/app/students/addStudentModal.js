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
        lastLogin: new Date().toISOString().split("T")[0],
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
                lastLogin: new Date().toISOString().split("T")[0],
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
            lastLogin: new Date().toISOString().split("T")[0],
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

                    <div className="space-y-2">
                        <Label htmlFor="lastLogin">Last Login Date</Label>
                        <Input
                            id="lastLogin"
                            type="date"
                            value={formData.lastLogin}
                            onChange={(e) => handleInputChange("lastLogin", e.target.value)}
                        />
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
