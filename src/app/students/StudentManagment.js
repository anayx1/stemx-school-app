"use client"

import { useState, useEffect } from "react"
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
import AddStudentModal from "./addStudentModal"
import DeleteConfirmationModal from "./DeleteModal"
import { deleteStudent } from "@/lib/actions"

export default function StudentManagement({ students: initialStudents = [] }) {
    const router = useRouter()

    
    const flattenedStudents = initialStudents.map(student => ({
        id: student.id,
        name: student.user?.full_name || 'N/A',
        email: student.user?.email || 'N/A',
        roll_number: student.roll_number,
        class: student.class, 
        gpa: student.gpa, 
        
    }));

    const [students, setStudents] = useState(flattenedStudents)
    const [search, setSearch] = useState("")
    const [classFilter, setClassFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, student: null })
    const [selectedStudents, setSelectedStudents] = useState([])
    const itemsPerPage = 10

    useEffect(() => {
        setStudents(initialStudents.map(student => ({
            id: student.id,
            name: student.user?.full_name || 'N/A',
            email: student.user?.email || 'N/A',
            roll_number: student.roll_number,
            class: student.class, 
            gpa: student.gpa, 
        })))
    }, [initialStudents])

    // Calculate stats
    const stats = {
        total: students.length,
        active: students.filter((s) => s.status === "Active").length,
        inactive: students.filter((s) => s.status === "Inactive").length,
        pending: students.filter((s) => s.status === "Pending").length,
        rejected: students.filter((s) => s.status === "Rejected").length,
    }


    const uniqueClasses = [...new Set(students.map((s) => s.class).filter(Boolean))].sort()


    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            (student.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (student.email || "").toLowerCase().includes(search.toLowerCase()) ||
            (student.id || "").toString().toLowerCase().includes(search.toLowerCase())

        const matchesClass = classFilter === "all" || (student.class && student.class === classFilter)

        return matchesSearch && matchesClass
    })

    // Pagination
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentStudents = filteredStudents.slice(startIndex, endIndex)

    const handleAddStudent = (newStudent) => {
        router.refresh();
        setIsAddModalOpen(false)
    }

    const handleDeleteStudent = (student) => {
        setDeleteModal({ isOpen: true, student })
    }

    const confirmDelete = async () => {
        try {
            await deleteStudent(deleteModal.student.id)
            setStudents(students.filter((s) => s.id !== deleteModal.student.id))
            setDeleteModal({ isOpen: false, student: null })
        } catch (error) {
            console.error(error)
            alert('Failed to delete student')
        }
    }

    const handleSelectStudent = (studentId, checked) => {
        if (checked) {
            setSelectedStudents([...selectedStudents, studentId])
        } else {
            setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
        }
    }

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedStudents(currentStudents.map((s) => s.id))
        } else {
            setSelectedStudents([])
        }
    }

    const handleSendEmail = (student) => {
        // Simulate sending email
        alert(`Email sent to ${student.name} at ${student.email}`)
    }

    const StatusBadge = ({ status }) => {
        const statusConfig = {
            Active: "bg-green-100 text-green-800 border-green-200",
            Pending: "bg-orange-100 text-orange-800 border-orange-200",
            Inactive: "bg-gray-100 text-gray-800 border-gray-200",
            Rejected: "bg-red-100 text-red-800 border-red-200",
        }

        return (
            <Badge variant="outline" className={`${statusConfig[status]} font-medium`}>
                <div
                    className={`w-2 h-2 rounded-full mr-2 ${status === "Active"
                        ? "bg-green-500"
                        : status === "Pending"
                            ? "bg-orange-500"
                            : status === "Rejected"
                                ? "bg-red-500"
                                : "bg-gray-500"
                        }`}
                />
                {status}
            </Badge>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl semi-medium text-gray-800">Students Management</h1>
                    <p className="text-sm text-gray-600">Manage your student records</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
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
                        <CardTitle className="text-sm font-medium">Inactive</CardTitle>
                        <UserX className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <UserX className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
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
                                placeholder="Search students..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Select value={classFilter} onValueChange={setClassFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Classes</SelectItem>
                                    {uniqueClasses.map((className) => (
                                        <SelectItem key={className} value={className}>
                                            Class {className}
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
                                            checked={selectedStudents.length === currentStudents.length && currentStudents.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="font-medium">ID</TableHead>
                                    <TableHead className="font-medium">Name</TableHead>
                                    <TableHead className="font-medium">Email</TableHead>
                                    {/* <TableHead className="font-medium">Status</TableHead> */}
                                    <TableHead className="font-medium">GPA</TableHead>
                                    {/* <TableHead className="font-medium">Attendance</TableHead> */}
                                    {/* <TableHead className="font-medium">Fees</TableHead> */}
                                    <TableHead className="font-medium">Class</TableHead>
                                    <TableHead className="font-medium text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentStudents.map((student, index) => (
                                    <TableRow
                                        key={student.id}
                                        className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedStudents.includes(student.id)}
                                                onCheckedChange={(checked) => handleSelectStudent(student.id, checked)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium text-blue-600">#{String(student.id).slice(-3)}</TableCell>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell className="text-gray-600">{student.email}</TableCell>
                                        {/* <TableCell>
                                            <StatusBadge status={student.status} />
                                        </TableCell> */}
                                        <TableCell className="font-medium">{student.gpa}</TableCell>
                                        {/* <TableCell>{student.attendance}</TableCell> */}
                                        {/* <TableCell className="font-medium">{student.fees}</TableCell> */}
                                        <TableCell>
                                            <Badge variant="outline">{student.class}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => router.push(`/students/${student.id}`)}
                                                    className="h-8 w-8 p-0 hover:bg-blue-100"
                                                    title="Edit Student"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-green-100"
                                                    onClick={() => handleSendEmail(student)}
                                                    title="Send Email"
                                                >
                                                    <Mail className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteStudent(student)}
                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                                                    title="Delete Student"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
                        <div className="text-sm text-gray-600">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length}{" "}
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
                </CardContent>
            </Card>

            <AddStudentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddStudent} />
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, student: null })}
                onConfirm={confirmDelete}
                title="Delete Student"
                description={`Are you sure you want to delete ${deleteModal.student?.name}? This action cannot be undone.`}
            />
        </div>
    )
}
