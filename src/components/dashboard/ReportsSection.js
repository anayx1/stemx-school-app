// app/components/ReportsSection.tsx
import React from 'react';

const ReportsSection = ({ reportsData }) => {
    return (
        <div className="">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Reports</h2>
                <a href="#" className="text-sm text-primary hover:underline">View All</a>
            </div>

            {/* On small screens, use a horizontal scrolling container */}
            <div className="sm:overflow-x-auto sm:pb-4">
                <div className="
                    sm:flex sm:flex-nowrap sm:gap-4 sm:w-[70%]
                    md:flex  md:w-full
                    lg:flex gap-4
                ">
                    {reportsData.map((report, index) => (
                        <div
                            key={report.id}
                            className="
                                flex items-start gap-4 p-5 bg-white dark:bg-gray-900 rounded-md
                                shadow-md hover:shadow-2xl transition-all duration-300 ease-out
                                transform hover:-translate-y-1 animate-fade-in opacity-0
                                sm:min-w-[320px]
                            "
                            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                        >
                            <div className="w-14 h-14 rounded-sm overflow-hidden shrink-0">
                                <img
                                    src={report.icon}
                                    alt={report.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold mb-1">{report.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{report.date}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{report.summary}</p>
                                <button className="px-4 py-1.5 text-sm font-medium rounded-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-primary hover:text-white transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Optional scroll indicator for small screens */}
            {/* <div className="sm:block md:hidden mt-2 text-center text-xs text-gray-500">
                Scroll horizontally to see more reports
            </div> */}
        </div>
    );
};

export default ReportsSection;