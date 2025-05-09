import React from 'react';
import { Button } from '../ui/button';

const ContinueLearning = ({ data }) => {
    return (
        <section className='flex justify-center items-center mt-5 flex-col '>
            <div className=" md:w-[90%] w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {data.map((activity, index) => (
                        <div
                            key={activity.id}
                            className=" bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <div
                                className="h-36 relative flex items-center justify-center"
                                style={{ backgroundImage: `url(${activity.icon})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            >
                                <div className="absolute inset-0" style={{ backgroundColor: `${activity.color}99` }}></div>
                                <div className="absolute top-3 left-3 bg-white/90 text-gray-800 font-medium text-xs px-3 py-1 rounded-full">
                                    {activity.subject}
                                </div>
                                <button className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                        <path d="M8 5.14v14l11-7-11-7z"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">Last accessed: {activity.lastAccessed}</p>

                                <div className="space-y-2">
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${activity.progress}%`,
                                                backgroundColor: activity.color
                                            }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-end">
                                        <span className="text-sm text-gray-600">{activity.progress}% complete</span>
                                    </div>
                                </div>

                                <Button className='w-full mt-5'>
                                    Continue
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContinueLearning;