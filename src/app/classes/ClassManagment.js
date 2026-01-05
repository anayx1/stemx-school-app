"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus, Search, Users, BookOpen, GraduationCap, UserCheck, Eye, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AddSubjectAssignmentModal from "./AddSubjectModal"
import DeleteConfirmationModal from "../students/DeleteModal"
import EditClassModal from "./EditClassModal"

export default function ClassManagement({ initialClasses, initialStats, availableTeachers }) {
    const router = useRouter()
    const [classes, setClasses] = useState(initialClasses)
    const [search, setSearch] = useState("")
    const [selectedClass, setSelectedClass] = useState(null)
    const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, assignment: null, classId: null })
    const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false)
    const [selectedClassForEdit, setSelectedClassForEdit] = useState(null)

    // Calculate stats
    const stats = {
        totalClasses: initialStats.total_classes,
        totalStudents: initialStats.total_students,
        totalSubjects: parseInt(initialStats.subject_assignments, 10) || 0,
        averageStudents: initialStats.average_students_per_class,
    }

    // Filter classes based on search
    const filteredClasses = classes.filter((cls) => {
        const matchesSearch =
            cls.class_name.toLowerCase().includes(search.toLowerCase())

        return matchesSearch
    })

    const handleAddAssignment = (classId, assignmentData) => {
        setClasses(
            classes.map((cls) => {
                if (cls.id === classId) {
                    const newAssignment = {
                        id: Date.now(),
                        subject: assignmentData.subject,
                        teacher: assignmentData.teacherName,
                        teacherId: assignmentData.teacherId,
                    }
                    return {
                        ...cls,
                        subjects: [...cls.subjects, newAssignment],
                    }
                }
                return cls
            }),
        )
        setIsAssignmentModalOpen(false)
        setSelectedClass(null)
    }

    const handleDeleteAssignment = (classId, assignmentId) => {
        const classData = classes.find((cls) => cls.id === classId)
        const assignment = classData.subjects.find((sub) => sub.id === assignmentId)
        setDeleteModal({ isOpen: true, assignment, classId })
    }

    const confirmDeleteAssignment = () => {
        setClasses(
            classes.map((cls) => {
                if (cls.id === deleteModal.classId) {
                    return {
                        ...cls,
                        subjects: cls.subjects.filter((sub) => sub.id !== deleteModal.assignment.id),
                    }
                }
                return cls
            }),
        )
        setDeleteModal({ isOpen: false, assignment: null, classId: null })
    }

    const openAssignmentModal = (classData) => {
        setSelectedClass(classData)
        setIsAssignmentModalOpen(true)
    }

    const openEditClassModal = (classData) => {
        setSelectedClassForEdit(classData)
        setIsEditClassModalOpen(true)
    }

    const handleEditClass = (classId, updatedData) => {
        setClasses(
            classes.map((cls) => {
                if (cls.id === classId) {
                    return {
                        ...cls,
                        ...updatedData,
                    }
                }
                return cls
            }),
        )
        setIsEditClassModalOpen(false)
        setSelectedClassForEdit(null)
    }

    return (
        <div className="p-5 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl semi-medium text-gray-800">Class Management</h1>
                    <p className="text-sm text-gray-600">Manage classes and subject assignments</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{stats.totalClasses}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.totalStudents}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subject Assignments</CardTitle>
                        <BookOpen className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{stats.totalSubjects}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Students/Class</CardTitle>
                        <UserCheck className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{stats.averageStudents}</div>
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
                                placeholder="Search classes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Classes List */}
                    <div className="p-6">
                        <div className="space-y-4">
                            {filteredClasses.map((classData, index) => (
                                <Accordion key={classData.id} type="single" collapsible className="w-full">
                                    <AccordionItem
                                        value={classData.id}
                                        className={`border rounded-lg ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                                    >
                                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                            <div className="flex items-center justify-between w-full mr-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-blue-100 p-3 rounded-lg">
                                                        <GraduationCap className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div className="text-left">
                                                        <h3 className="text-xl font-semibold">{classData.class_name}</h3>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                                            <span>{classData.total_students} Students</span>
                                                            <span>•</span>
                                                            <span>{classData.subjects.length} Subjects</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                                    <Button onClick={() => openEditClassModal(classData)} size="sm" variant="outline">
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit Class
                                                    </Button>
                                                    <Button onClick={() => openAssignmentModal(classData)} size="sm">
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Add Subject
                                                    </Button>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-6">
                                            <div className="space-y-4 pt-4 border-t">
                                                <h4 className="font-medium text-gray-900">Subject Assignments</h4>
                                                {classData.subjects.length > 0 ? (
                                                    <div className="overflow-x-auto">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow className="bg-gray-50">
                                                                    <TableHead className="font-medium">Subject</TableHead>
                                                                    <TableHead className="font-medium text-center">Actions</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {classData.subjects.map((subject, subIndex) => (
                                                                    <TableRow
                                                                        key={subject.id}
                                                                        className={`${subIndex % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                                                                    >
                                                                        <TableCell>
                                                                            <Badge variant="outline" className="font-medium">
                                                                                {subject.name}
                                                                            </Badge>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <div className="flex items-center justify-center space-x-2">
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    className="h-8 w-8 p-0 hover:bg-blue-100"
                                                                                    title="Edit Assignment"
                                                                                >
                                                                                    <Edit className="h-4 w-4" />
                                                                                </Button>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleDeleteAssignment(classData.id, subject.id)}
                                                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                                                                                    title="Delete Assignment"
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
                                                ) : (
                                                    <div className="text-center py-8 text-gray-500">
                                                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                                        <p>No subjects assigned yet</p>
                                                        <Button
                                                            onClick={() => openAssignmentModal(classData)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2"
                                                        >
                                                            Add First Subject
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AddSubjectAssignmentModal
                isOpen={isAssignmentModalOpen}
                onClose={() => {
                    setIsAssignmentModalOpen(false)
                    setSelectedClass(null)
                }}
                onAdd={handleAddAssignment}
                classData={selectedClass}
                availableTeachers={availableTeachers}
            />

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, assignment: null, classId: null })}
                onConfirm={confirmDeleteAssignment}
                title="Delete Subject Assignment"
                description={`Are you sure you want to remove ${deleteModal.assignment?.subject} assignment for ${deleteModal.assignment?.teacher}? This action cannot be undone.`}
            />

            <EditClassModal
                isOpen={isEditClassModalOpen}
                onClose={() => {
                    setIsEditClassModalOpen(false)
                    setSelectedClassForEdit(null)
                }}
                onEdit={handleEditClass}
                classData={selectedClassForEdit}
                availableTeachers={availableTeachers}
            />
        </div>
    )
}
