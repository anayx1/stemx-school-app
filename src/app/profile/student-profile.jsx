"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfo from "./profile-info";
import QuizResults from "./quiz-results";
import HelpSupport from "./help-support";
import LearningStreakCard from "@/components/dashboard/LearningStreakCard";
import {
  recentActivityData,
  streakData,
  performanceData,
  achievementsData,
  reportsData,
} from "../lib/data";

import PerformanceChart from "@/components/dashboard/PerformanceChart";

export default function StudentProfile() {
  // Mock student data - in a real app, this would come from an API or database
  const [student, setStudent] = useState({
    name: "Alex Johnson",
    avatar: "/avatar.png",
    school: "Westlake High School",
    grade: "11th Grade",
    quizResults: [
      {
        id: 1,
        subject: "Mathematics",
        score: 85,
        date: "2023-04-15",
        totalQuestions: 20,
      },
      {
        id: 2,
        subject: "Science",
        score: 92,
        date: "2023-04-10",
        totalQuestions: 25,
      },
      {
        id: 3,
        subject: "History",
        score: 78,
        date: "2023-04-05",
        totalQuestions: 30,
      },
      {
        id: 4,
        subject: "English",
        score: 88,
        date: "2023-03-28",
        totalQuestions: 15,
      },
    ],
  });

  return (
    <>
      <div className="w-full mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>
        <div className=" rounded-xl shadow-md overflow-hidden mb-8">
          <div
            className="relative w-full bg-cover bg-center z-20"
            style={{ backgroundImage: "url('/profilebg.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-30"></div>

            <ProfileInfo student={student} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-1">
          <LearningStreakCard />
          <PerformanceChart performanceData={performanceData} />
        </div>
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient1">
            <TabsTrigger value="results">Quiz Results</TabsTrigger>
            <TabsTrigger value="help">Help & Support</TabsTrigger>
          </TabsList>
          <TabsContent
            value="results"
            className="bg-white p-6 rounded-xl shadow-md mt-4"
          >
            <QuizResults results={student.quizResults} />
          </TabsContent>
          <TabsContent
            value="help"
            className="bg-white p-6 rounded-xl shadow-md mt-4"
          >
            <HelpSupport />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
