import StudentProfile from "./student-profile";

export default function Home() {
    return (
        <main className='w-full flex justify-center items-center bg-gray-100 pb-5'>
            <section className='w-[95%] md-[w-90%] lg-[w-90%] justify-center items-center mt-5'>
                <StudentProfile />
            </section>
        </main >
    )
}
