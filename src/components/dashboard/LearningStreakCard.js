// app/components/LearningStreakCard.jsx (server component by default in /app)

const LearningStreakCard = ({ streakData }) => {
    // Sample data structure if not provided
    const defaultStreakData = {
        currentStreak: 6,
        longestStreak: 14,
        totalDaysActive: 28,
        thisWeek: [true, true, true, true, true, true, false], // Sun through Sat
    };

    // Use provided data or default
    const data = streakData || defaultStreakData;

    // Array of weekday abbreviations
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm p-5 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold">Learning Streak</h3>
                <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <span role="img" aria-label="fire">🔥</span>
                    <span>{data.currentStreak} days</span>
                </div>
            </div>

            <div className="flex justify-between mb-6">
                <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {data.longestStreak}
                    </span>
                    <span className="text-xs text-gray-500">Longest Streak</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {data.totalDaysActive}
                    </span>
                    <span className="text-xs text-gray-500">Total Days</span>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-sm p-4 mb-4">
                {/* Key change: Using flex with grid or flex-col for each day */}
                <div className="grid grid-cols-7 gap-2">
                    {weekdays.map((day, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 mb-1">{day}</span>
                            <div
                                title={data.thisWeek[index] ? "Active" : "Inactive"}
                                className={`w-6 h-6 rounded-full ${data.thisWeek[index] ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                                    }`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {data.currentStreak > 0
                        ? "Great job! Keep learning daily to maintain your streak."
                        : "Start learning today to build your streak!"}
                </p>
            </div>
        </div>
    );
};

export default LearningStreakCard;