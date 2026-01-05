"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditStudentForm({ student, handleAction }) {
    const [previewUrl, setPreviewUrl] = useState(student.profile_picture || "")
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const newPreviewUrl = URL.createObjectURL(file)
            setPreviewUrl(newPreviewUrl)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Student: {student.full_name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleAction} className="space-y-6">
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={previewUrl || "/avatar.png"}
                                alt="Profile Preview"
                                className="w-24 h-24 object-cover rounded-full"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = "/avatar.png"
                                }}
                            />
                            <Input
                                type="file"
                                name="profile_picture_file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current.click()}
                            >
                                Upload New Picture
                            </Button>
                            <input type="hidden" name="profile_picture" defaultValue={student.profile_picture || ""} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                            <div>
                                <label className="block mb-1 font-medium">ID</label>
                                <Input name="id" defaultValue={student.id} readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Roll Number</label>
                                <Input name="roll_number" defaultValue={student.roll_number} readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Name</label>
                                <Input name="name" defaultValue={student.full_name || ''} />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <Input name="email" defaultValue={student.email || ''} />
                            </div>
                            
                            <div>
                                <label className="block mb-1 font-medium">Class</label>
                                <Input name="class" defaultValue={student.class || ''} />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Status</label>
                                <Input name="status" defaultValue={student.status || ''} />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Date of Birth</label>
                                <Input
                                    type="date"
                                    name="date_of_birth"
                                    defaultValue={student.date_of_birth ? new Date(student.date_of_birth).toISOString().split('T')[0] : ''}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Admission Date</label>
                                <Input
                                    type="date"
                                    name="admission_date"
                                    defaultValue={student.admission_date ? new Date(student.admission_date).toISOString().split('T')[0] : ''}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Phone</label>
                                <Input name="phone" defaultValue={student.contact_number || ''} />
                            </div>
                            
                            
                            <div>
                                <label className="block mb-1 font-medium">Fees</label>
                                <Input name="fees" defaultValue={student.fees || ''} readOnly />
                            </div>
                             <div>
                                <label className="block mb-1 font-medium">Last Login</label>
                                <Input name="lastLogin" defaultValue={student.lastLogin || ''} readOnly />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Address</label>
                            <Input
                                type="text"
                                name="address"
                                defaultValue={student.address || ''}
                            />
                        </div>
                        
                        <div className="flex gap-2 pt-4">
                            <Button type="submit">Save Changes</Button>
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}