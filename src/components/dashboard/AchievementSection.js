// app/components/AchievementSection.tsx
import React from 'react';

const AchievementSection = ({ achievements }) => {
    return (
        <div className="">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Achievements</h2>
                <a href="#" className="text-sm text-primary hover:underline">View All</a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                    <div
                        key={achievement.id}
                        className={`relative overflow-hidden p-5 flex flex-col items-center text-center rounded-md shadow-sm bg-white dark:bg-gray-900 transition-transform duration-200 ease-out transform hover:-translate-y-1 hover:shadow-md ${achievement.unlocked ? 'opacity-100' : 'opacity-70'
                            }`}
                        style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                    >
                        {!achievement.unlocked && (
                            <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
                        )}
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-2xl mb-4 z-20">
                            <span>{achievement.icon}</span>
                        </div>
                        <div className="z-20">
                            <h3 className="text-base font-semibold mb-1">{achievement.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                            <span
                                className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${achievement.unlocked ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {achievement.unlocked ? 'Unlocked' : 'In Progress'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementSection;
