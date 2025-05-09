import React from 'react'
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import { recentActivityData, streakData, performanceData, achievementsData, reportsData } from "../lib/data";
import SubjectsDashboard from '@/components/dashboard/SubjectsSection';
import LearningStreakCard from '@/components/dashboard/LearningStreakCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import AchievementSection from '@/components/dashboard/AchievementSection';
import ReportsSection from '@/components/dashboard/ReportsSection';

const page = () => {
    const data = recentActivityData;

    return (
        <>
            <main className='w-full flex justify-center items-center bg-gray-100 pb-5'>
                <section className='w-[95%] md-[w-90%] lg-[w-90%] justify-center items-center mt-5'>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-3xl font-semibold">
                            <h1>Good afternoon, Alex!</h1>
                            <p className="text-sm text-gray-600">Ready to continue your learning journey?</p>
                        </div>
                    </div>
                    <ContinueLearning data={recentActivityData} />
                    <section className='flex mt-5 justify-between flex-wrap'>
                        <div className='lg:w-2/3 w-full py-7'>
                            <SubjectsDashboard />
                        </div>
                        <div className='lg:w-1/4 w-full mt-10 h-fit'>
                            <LearningStreakCard streakData={streakData} />
                            <PerformanceChart performanceData={performanceData} />
                        </div>
                    </section>
                    <section>
                        <ReportsSection reportsData={reportsData} />
                    </section>
                    <section className='mt-5'>
                        <AchievementSection achievements={achievementsData} />
                    </section>
                </section>
            </main>

        </>

    )
}

export default page