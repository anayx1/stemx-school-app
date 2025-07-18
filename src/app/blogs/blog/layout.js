import Image from 'next/image'
import Link from 'next/link'

export default function BlogLayout({ children }) {
    return (
        <>
            <section className='relative h-[50dvh] w-full'>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/banner-pages.png')"
                    }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex h-full items-center justify-center px-4 text-white">
                    <div>
                        <h2 className='text-white' >
                            Single Blog Page
                        </h2>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 max-w-[90%]">
                <div className="flex flex-col lg:flex-row gap-10 ">
                    {/* Main Content */}
                    <main className="flex-1">
                        {children}
                    </main>
                    {/* Sidebar */}
                    <aside className="w-full lg:w-[280px] space-y-8 mt-20">
                        {/* Archives */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Archives</h2>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                                        <span className="text-[#666666]">
                                            <Image
                                                src={'/beauty_icon.png'}
                                                width={20}
                                                height={20}
                                                alt='icon'
                                            />
                                        </span>
                                        <span className="ml-2">August 2024</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Categories</h2>
                            <ul className="space-y-2">
                                {[
                                    'Educational',
                                    'Healthy Food',
                                    'Lifestyles',
                                    'News',
                                    'Nutrition',
                                    'Tip & Tricks',
                                    'Uncategorized'
                                ].map((category) => (
                                    <li key={category}>
                                        <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                                            <span className="text-[#666666]"><Image
                                                src={'/beauty_icon.png'}
                                                width={20}
                                                height={20}
                                                alt='icon'
                                            /></span>
                                            <span className="ml-2">{category}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Search */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Search</h2>
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    aria-label="Search"
                                >
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Blog Categories with counts */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Blog Categories</h2>
                            <ul className="space-y-2">
                                {[
                                    { name: 'Educational', count: 3 },
                                    { name: 'Healthy Food', count: 3 },
                                    { name: 'Lifestyles', count: 4 },
                                    { name: 'News', count: 3 },
                                    { name: 'Nutrition', count: 3 },
                                    { name: 'Tip & Tricks', count: 2 },
                                    { name: 'Uncategorized', count: 1 }
                                ].map((category) => (
                                    <li key={category.name}>
                                        <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-[#666666]">
                                                    <Image
                                                        src={'/beauty_icon.png'}
                                                        width={20}
                                                        height={20}
                                                        alt='icon'
                                                    />
                                                </span>
                                                <span className="ml-2">{category.name}</span>
                                            </div>
                                            <span className="text-gray-400">({category.count})</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recent Posts */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
                            <div className="space-y-4">
                                <Link href="#" className="group flex gap-4">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                                        <Image
                                            src="/placeholder.svg"
                                            alt="Blog post thumbnail"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* <div>
                                        <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-gray-600">
                                            Top dos & don'ts for Valentine's Day with your pet
                                        </h3>
                                    </div> */}
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}
