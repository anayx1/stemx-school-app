'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    GraduationCap,
    TrendingUp,
    Award,
    Calendar,
    BookOpen
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const performanceData = [
    { subject: "Math", average: 85, students: 120 },
    { subject: "Science", average: 78, students: 115 },
    { subject: "English", average: 82, students: 125 },
    { subject: "History", average: 75, students: 110 },
    { subject: "Arts", average: 88, students: 95 },
];

const monthlyData = [
    { month: "Jan", attendance: 95, performance: 82 },
    { month: "Feb", attendance: 93, performance: 85 },
    { month: "Mar", attendance: 97, performance: 87 },
    { month: "Apr", attendance: 94, performance: 83 },
    { month: "May", attendance: 96, performance: 89 },
    { month: "Jun", attendance: 98, performance: 91 },
];

const gradeDistribution = [
    { grade: "A", count: 45, color: "#10B981" },
    { grade: "B", count: 78, color: "#3B82F6" },
    { grade: "C", count: 65, color: "#F59E0B" },
    { grade: "D", count: 25, color: "#EF4444" },
    { grade: "F", count: 12, color: "#6B7280" },
];

const recentActivities = [
    {
        id: 1,
        title: "New Achievement Unlocked",
        description: "Class 10-A achieved 95% attendance this month",
        time: "2 hours ago",
        icon: Award,
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600"
    },
    {
        id: 2,
        title: "New Course Material Added",
        description: "Advanced Mathematics curriculum updated",
        time: "5 hours ago",
        icon: BookOpen,
        bgColor: "bg-green-50",
        iconColor: "text-green-600"
    },
    {
        id: 3,
        title: "Teacher Assignment",
        description: "Ms. Johnson assigned to Physics - Grade 11",
        time: "1 day ago",
        icon: Users,
        bgColor: "bg-yellow-50",
        iconColor: "text-yellow-600"
    }
];

export default function DashboardOverview() {
    return (
        <div >
            <div className="space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-xl semi-medium text-gray-800">School Dashboard</h1>
                    <p className="text-gray-600 text-sm">Overview of school performance and activities</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-blue-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <GraduationCap className="h-4 w-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">1,247</div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="text-green-600 font-medium">+12%</span> from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-purple-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Active Teachers</CardTitle>
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Users className="h-4 w-4 text-purple-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">87</div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="text-green-600 font-medium">+5</span> new this semester
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-green-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Avg Performance</CardTitle>
                            <div className="p-2 bg-green-100 rounded-lg">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">84.2%</div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="text-green-600 font-medium">+2.1%</span> improvement
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-orange-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Attendance Rate</CardTitle>
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Calendar className="h-4 w-4 text-orange-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">96.8%</div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="text-green-600 font-medium">+0.3%</span> from last week
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Performance by Subject */}
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">Performance by Subject</CardTitle>
                            <CardDescription className="text-gray-600">Average scores across all classes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="subject"
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={{ stroke: '#e0e0e0' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={{ stroke: '#e0e0e0' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Bar
                                        dataKey="average"
                                        fill="#3B82F6"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Monthly Trends */}
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">Monthly Trends</CardTitle>
                            <CardDescription className="text-gray-600">Attendance and performance over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={{ stroke: '#e0e0e0' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={{ stroke: '#e0e0e0' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="attendance"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                        name="Attendance"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="performance"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                        name="Performance"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Grade Distribution and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">Grade Distribution</CardTitle>
                            <CardDescription className="text-gray-600">Current semester grades</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={gradeDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        dataKey="count"
                                    >
                                        {gradeDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-4 flex-wrap">
                                {gradeDistribution.map((grade) => (
                                    <div key={grade.grade} className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: grade.color }}
                                        />
                                        <span className="text-sm font-medium">{grade.grade}: {grade.count}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2 border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activities</CardTitle>
                            <CardDescription className="text-gray-600">Latest updates and notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => {
                                    const IconComponent = activity.icon;
                                    return (
                                        <div
                                            key={activity.id}
                                            className={`flex items-start gap-3 p-4 ${activity.bgColor} rounded-xl border border-gray-100 hover:shadow-sm transition-shadow duration-200`}
                                        >
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <IconComponent className={`h-5 w-5 ${activity.iconColor}`} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{activity.title}</p>
                                                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                                <p className="text-xs text-gray-500 mt-2 font-medium">{activity.time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}