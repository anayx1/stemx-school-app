import Link from "next/link"

// Mock data is imported or defined in your actual component
const subjectsData = [
    {
        id: "1",
        subject: "Maths",
        icon: "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        progress: 60,
        nextTopic: "Quadratic Equations",
        teacher: "Mrs. Johnson",
        color: "#4361EE",
    },
    {
        id: "2",
        subject: "Physics",
        icon: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        progress: 45,
        nextTopic: "Newton's Laws of Motion",
        teacher: "Mr. Richards",
        color: "#3A0CA3",
    },
    {
        id: "3",
        subject: "SST",
        icon: "https://images.pexels.com/photos/2393789/pexels-photo-2393789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        progress: 78,
        nextTopic: "French Revolution",
        teacher: "Ms. Peters",
        color: "#F72585",
    },
    {
        id: "4",
        subject: "Science",
        icon: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        progress: 32,
        nextTopic: "Cell Structure",
        teacher: "Dr. Williams",
        color: "#7209B7",
    },
    {
        id: "5",
        subject: "English",
        icon: "https://images.pexels.com/photos/1448709/pexels-photo-1448709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        progress: 65,
        nextTopic: "Shakespeare's Hamlet",
        teacher: "Mrs. Thompson",
        color: "#4CC9F0",
    },
    {
        id: "6",
        subject: "Chemistry",
        icon: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        progress: 51,
        nextTopic: "Periodic Table",
        teacher: "Mrs. Davis",
        color: "#F94144",
    },
    {
        id: "7",
        subject: "Computer Science",
        icon: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        progress: 88,
        nextTopic: "Algorithms",
        teacher: "Mr. Anderson",
        color: "#F3722C",
    },
    {
        id: "8",
        subject: "Arts",
        icon: "https://images.pexels.com/photos/374054/pexels-photo-374054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        progress: 75,
        nextTopic: "Renaissance Art",
        teacher: "Ms. Garcia",
        color: "#F8961E",
    },
]

export default function SubjectsDashboard() {
    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">My Subjects</h2>
                <Link href="/all-subjects" className="text-blue-600 hover:underline">
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {subjectsData.map((subject) => (
                    <Link key={subject.id} href={`/dashboard/chapters/${subject.id}`} className="block">
                        <SubjectCard subject={subject} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function SubjectCard({ subject }) {
    const { subject: name, icon, progress, color } = subject;

    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className=" bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 p-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-1">
                <img
                    src={icon || "/placeholder.svg"}
                    alt={name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                />
            </div>
            <h3 className="text-lg font-medium text-gray-800">{name}</h3>
            <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold">{progress}%</span>
                </div>
            </div>
        </div>
    );
}