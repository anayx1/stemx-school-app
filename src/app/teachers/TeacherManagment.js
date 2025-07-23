"use client"

import { useState, useTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Edit,
    Mail,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Search,
    Plus,
    Users,
    UserCheck,
    Clock,
    UserX,
} from "lucide-react"
import { useRouter } from "next/navigation"
import AddTeacherModal from "./addTeacherModal"
import DeleteConfirmationModal from "./DeleteModal"
import { deleteTeacher } from "@/lib/teachers/actions"

export default function TeacherManagement({ teachers = [], error = null }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [search, setSearch] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, teacher: null })
    const [selectedTeachers, setSelectedTeachers] = useState([])
    const itemsPerPage = 10

    // Calculate stats from real data
    const stats = {
        total: teachers.length,
        active: teachers.filter((t) => t.status === "Active" || !t.status).length, // Default to active if no status
        inactive: teachers.filter((t) => t.status === "Inactive").length,
        pending: teachers.filter((t) => t.status === "Pending").length,
        rejected: teachers.filter((t) => t.status === "Rejected").length,
    }

    // Get unique departments from real data
    const departments = [...new Set(teachers.map((t) => t.subject_specialization).filter(Boolean))]

    // Filter teachers based on search and department
    const filteredTeachers = teachers.filter((teacher) => {
        const matchesSearch =
            teacher.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            teacher.email?.toLowerCase().includes(search.toLowerCase()) ||
            teacher.id?.toString().includes(search.toLowerCase())

        const matchesDepartment = departmentFilter === "all" || teacher.subject_specialization === departmentFilter

        return matchesSearch && matchesDepartment
    })

    // Pagination
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentTeachers = filteredTeachers.slice(startIndex, endIndex)

    const handleDeleteTeacher = (teacher) => {
        setDeleteModal({ isOpen: true, teacher })
    }

    const confirmDelete = () => {
        startTransition(async () => {
            try {
                await deleteTeacher(deleteModal.teacher.id)
                setDeleteModal({ isOpen: false, teacher: null })
                router.refresh() // Refresh to show updated data
            } catch (error) {
                console.error("Failed to delete teacher:", error)
                // You might want to show an error message to the user
            }
        })
    }

    const handleSelectTeacher = (teacherId, checked) => {
        if (checked) {
            setSelectedTeachers([...selectedTeachers, teacherId])
        } else {
            setSelectedTeachers(selectedTeachers.filter((id) => id !== teacherId))
        }
    }

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedTeachers(currentTeachers.map((t) => t.id))
        } else {
            setSelectedTeachers([])
        }
    }

    const handleSendEmail = (teacher) => {
        // Simulate sending email
        alert(`Email sent to ${teacher.full_name} at ${teacher.email}`)
    }

    const formatExperience = (years) => {
        if (!years) return "N/A"
        return `${years} year${years !== 1 ? "s" : ""}`
    }

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        return new Date(dateString).toLocaleDateString()
    }

    if (error) {
        return (
            <div className="p-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center text-red-600">
                            <h2 className="text-lg font-semibold mb-2">Error Loading Teachers</h2>
                            <p>{error}</p>
                            <Button onClick={() => router.refresh()} className="mt-4">
                                Try Again
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Teachers Management</h1>
                    <p className="text-sm text-gray-600">Manage your teaching staff</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Teacher
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Experience Avg</CardTitle>
                        <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {teachers.length > 0
                                ? Math.round(teachers.reduce((sum, t) => sum + (t.experience_years || 0), 0) / teachers.length)
                                : 0}
                            y
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Departments</CardTitle>
                        <UserX className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{departments.length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-0">
                    {/* Search and Filter */}
                    <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search teachers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Subjects</SelectItem>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedTeachers.length === currentTeachers.length && currentTeachers.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="font-medium">ID</TableHead>
                                    <TableHead className="font-medium">Name</TableHead>
                                    <TableHead className="font-medium">Email</TableHead>
                                    <TableHead className="font-medium">Subject</TableHead>
                                    <TableHead className="font-medium">Experience</TableHead>
                                    <TableHead className="font-medium">Phone</TableHead>
                                    <TableHead className="font-medium text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentTeachers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                            No teachers found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    currentTeachers.map((teacher, index) => (
                                        <TableRow
                                            key={teacher.id}
                                            className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedTeachers.includes(teacher.id)}
                                                    onCheckedChange={(checked) => handleSelectTeacher(teacher.id, checked)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium text-blue-600">#{teacher.id}</TableCell>
                                            <TableCell className="font-medium">{teacher.full_name}</TableCell>
                                            <TableCell className="text-gray-600">{teacher.email}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{teacher.subject_specialization || "N/A"}</Badge>
                                            </TableCell>
                                            <TableCell>{formatExperience(teacher.experience_years)}</TableCell>
                                            <TableCell className="text-gray-600">{teacher.phone_number || "N/A"}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => router.push(`/teachers/${teacher.id}`)}
                                                        className="h-8 w-8 p-0 hover:bg-blue-100"
                                                        title="Edit Teacher"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-green-100"
                                                        onClick={() => handleSendEmail(teacher)}
                                                        title="Send Email"
                                                    >
                                                        <Mail className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteTeacher(teacher)}
                                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                                                        title="Delete Teacher"
                                                        disabled={isPending}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
                            <div className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredTeachers.length)} of {filteredTeachers.length}{" "}
                                results
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const page = i + 1
                                    return (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className="w-8 h-8 p-0"
                                        >
                                            {page}
                                        </Button>
                                    )
                                })}
                                {totalPages > 5 && (
                                    <>
                                        <span className="text-gray-400">...</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(totalPages)}
                                            className="w-8 h-8 p-0"
                                        >
                                            {totalPages}
                                        </Button>
                                    </>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AddTeacherModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, teacher: null })}
                onConfirm={confirmDelete}
                title="Delete Teacher"
                description={`Are you sure you want to delete ${deleteModal.teacher?.full_name}? This action cannot be undone.`}
            />
        </div>
    )
}
