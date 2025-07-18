import React from 'react'
import DashboardOverview from './Dashboard';

const page = () => {

    return (
        <>
            <main className='w-full flex flex-col justify-center items-center bg-gray-100 pb-5 '>
                {/* <section className='w-[95%] md-[w-90%] lg-[w-90%] justify-center items-center mt-5'>
                    <Greeting />
                </section> */}
                <section className='w-[95%] md-[w-90%] lg-[w-90%] justify-center items-center mt-5'>
                    <DashboardOverview />
                </section>
            </main>

        </>

    )
}

export default page