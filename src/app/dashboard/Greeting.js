import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Greeting() {
    const timeZone = 'Asia/Kolkata'; // Or detect dynamically later
    const now = dayjs().tz(timeZone);

    const currentHour = now.hour();

    let greeting = "Hello";
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 14) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="text-3xl font-semibold">
                <h1>{greeting}, Alex!</h1>
                <p className="text-sm text-gray-600">
                    Ready to continue your learning journey?
                </p>
            </div>
        </div>
    );
}
