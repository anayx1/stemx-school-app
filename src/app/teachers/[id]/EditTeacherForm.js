'use client'

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditTeacherForm({ teacher, handleAction }) {
    const [previewUrl, setPreviewUrl] = useState(teacher.profile_picture || "")
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
                    <CardTitle>Edit Teacher: {teacher.full_name}</CardTitle>
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
                            <input type="hidden" name="profile_picture" defaultValue={teacher.profile_picture || ""} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                            <div>
                                <label className="block mb-1 font-medium">ID</label>
                                <Input name="id" defaultValue={teacher.id} readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Name</label>
                                <Input name="full_name" defaultValue={teacher.full_name || ''} readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <Input name="email" defaultValue={teacher.email || ''} readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Phone Number</label>
                                <Input name="phone_number" defaultValue={teacher.phone_number || ''} />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Qualification</label>
                                <Input name="qualification" defaultValue={teacher.qualification || ''} />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Gender</label>
                                <Input name="gender" defaultValue={teacher.gender || ''} readOnly />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Date of Birth</label>
                                <Input
                                    type="date"
                                    name="date_of_birth"
                                    defaultValue={teacher.date_of_birth ? new Date(teacher.date_of_birth).toISOString().split('T')[0] : ''}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Experience (Years)</label>
                                <Input name="experience_years" defaultValue={teacher.experience_years || ''} />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Subject Specialization</label>
                                <Input name="subject_specialization" defaultValue={teacher.subject_specialization || ''} />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Address</label>
                            <Input
                                type="text"
                                name="address"
                                defaultValue={teacher.address || ''}
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
