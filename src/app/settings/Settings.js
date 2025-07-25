"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { School, Save, Mail, Info } from "lucide-react"

// Mock current settings data
const currentSettings = {
    schoolInfo: {
        name: "Greenwood High School",
        logo: "/placeholder.svg?height=100&width=100",
        address: "123 Education Street, Learning City, LC 12345",
        phone: "+1 (555) 123-4567",
        email: "info@greenwoodhigh.edu",
        website: "www.greenwoodhigh.edu",
        establishedYear: "1985",
        description: "A leading educational institution committed to excellence in learning and character development.",
    },
}

export default function SettingsManagement() {
    const [settings, setSettings] = useState(currentSettings)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const handleSettingChange = (section, field, value) => {
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }))
        setHasUnsavedChanges(true)
    }

    const handleSave = () => {
        // In real app, save to API
        setHasUnsavedChanges(false)
        alert("School information updated successfully!")
    }

    return (
        <div className="p-6 space-y-6">
            {/* Admin Contact Notice */}
            <Alert className="border-blue-200 bg-red-50 flex justify-start items-center">
                <AlertDescription className="text-red-600 pl-0 m-0 flex justify-start items-center gap-2">
                    <Info className="h-4 w-auto text-red-600" />
                    <strong>Need to change your school name or logo?</strong> Please contact our admin support team at{" "}
                    <a href="mailto:brainexlabs.com" className="font-medium underline hover:no-underline">
                        brainexlabs.com
                    </a>{" "}
                    for assistance with these changes.
                </AlertDescription>
            </Alert>

            <div className="grid gap-6 md:grid-cols-2">
                {/* School Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <School className="w-5 h-5" />
                            School Information
                        </CardTitle>
                        <CardDescription>Update your school's contact and basic information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="schoolName">School Name</Label>
                            <Input
                                id="schoolName"
                                value={settings.schoolInfo.name}
                                disabled
                                className="bg-gray-50 text-gray-500"
                                placeholder="Contact admin to change school name"
                            />
                            <p className="text-xs text-gray-500">Contact admin support to modify school name</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={settings.schoolInfo.address}
                                onChange={(e) => handleSettingChange("schoolInfo", "address", e.target.value)}
                                rows={3}
                                placeholder="Enter school address"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={settings.schoolInfo.phone}
                                    onChange={(e) => handleSettingChange("schoolInfo", "phone", e.target.value)}
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={settings.schoolInfo.email}
                                    onChange={(e) => handleSettingChange("schoolInfo", "email", e.target.value)}
                                    placeholder="Enter email address"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={settings.schoolInfo.website}
                                    onChange={(e) => handleSettingChange("schoolInfo", "website", e.target.value)}
                                    placeholder="Enter website URL"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="established">Established Year</Label>
                                <Input
                                    id="established"
                                    value={settings.schoolInfo.establishedYear}
                                    onChange={(e) => handleSettingChange("schoolInfo", "establishedYear", e.target.value)}
                                    placeholder="Enter establishment year"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">School Description</Label>
                            <Textarea
                                id="description"
                                value={settings.schoolInfo.description}
                                onChange={(e) => handleSettingChange("schoolInfo", "description", e.target.value)}
                                rows={3}
                                placeholder="Enter a brief description of your school"
                            />
                        </div>

                        <Button onClick={handleSave} className="w-full" disabled={!hasUnsavedChanges}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>

                {/* School Logo Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>School Logo</CardTitle>
                        <CardDescription>Current school logo and branding</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-32 h-32 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                                <img
                                    src={settings.schoolInfo.logo || "/placeholder.svg"}
                                    alt="School logo"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>

                            <div className="text-center space-y-2">
                                <h3 className="font-medium text-gray-900">{settings.schoolInfo.name}</h3>
                                <p className="text-sm text-gray-500">Current School Logo</p>
                            </div>

                            <Alert className="w-full">
                                <Mail className="h-4 w-4" />
                                <AlertDescription>
                                    To update your school logo, please contact our admin support team at{" "}
                                    <a href="mailto:brainexlabs.com" className="font-medium text-blue-600 hover:underline">
                                        brainexlabs.com
                                    </a>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Support Contact Card */}
            <Card className="border-blue-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                        <Mail className="w-5 h-5" />
                        Need Help?
                    </CardTitle>
                    <CardDescription>Contact our support team for assistance</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                            For changes to your school name, logo, or if you need technical assistance, our support team is here to
                            help.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                            <strong>Email Support:</strong>
                            <a href="mailto:brainexlabs.com" className="text-blue-600 hover:underline font-medium">
                                brainexlabs.com
                            </a>
                        </div>
                        <p className="text-xs text-gray-500">
                            We typically respond to support requests within 24 hours during business days.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
