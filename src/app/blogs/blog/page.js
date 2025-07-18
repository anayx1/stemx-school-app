'use client'
import { Check, ReplyIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const categoryColors = {
    "Skin Care": "bg-rose-500",
    "Beauty": "bg-rose-500"
}

const comments = [
    {
        id: 1,
        author: "Joe Doe",
        date: "September 13, 2024",
        content: "This is exactly what i was looking for, thank you so much for the detailed information about facial treatments!"
    },
    {
        id: 2,
        author: "Mike",
        date: "September 13, 2024",
        content: "Great explanation of the different treatment options available."
    },
    {
        id: 3,
        author: "Elicia",
        date: "September 13, 2024",
        content: "The skincare tips are really helpful. Looking forward to trying these treatments!"
    }
]

const handleSubmit = () => {
    e.preventDefault()
    console.log(formData)
}

export default function BlogPost() {
    const [rememberMe, setRememberMe] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        comment: ''
    })
    return (
        <>
            <article className="prose prose-lg max-w-none space-y-m">
                {/* Categories */}
                <div className="mb-6 flex gap-2 not-prose mt-5">
                    {["Skin Care", "Beauty"].map((category) => (
                        <span
                            key={category}
                            className={`rounded-full ${categoryColors[category]} px-3 py-1 text-xs font-medium text-white`}
                        >
                            {category}
                        </span>
                    ))}
                </div>

                {/* Date */}
                <time className="block text-sm text-gray-500">
                    January 21, 2025
                </time>

                {/* Featured Image */}
                <div className="my-8 aspect-[16/10] overflow-hidden rounded-xl">
                    <Image
                        src="/image1.jpg"
                        alt="Facial rejuvenation treatment"
                        width={1200}
                        height={750}
                        className="object-cover"
                    />
                </div>

                {/* Introduction Content */}
                <p>
                    Ageing is inevitable, but who says we can't age gracefully? Facial rejuvenation treatments are now more accessible, effective and are tailored to individual needs with groundbreaking advanced skincare treatments.
                </p>

                <p>
                    There is now a solution for almost all types of skin problems from smoothing fine lines to restoring your youthful glow. Let's learn more about skin rejuvenation treatment and find answers for questions that are a facial rejuvenation treatment?
                </p>
            </article>

            <article className="prose prose-lg max-w-none mt-5 space-y-2">
                {/* Main Content Sections */}
                <h2 className="text-2xl font-semibold text-gray-900">What is a Facial Rejuvenation Treatment?</h2>
                <p className="text-gray-600">
                    Facial rejuvenation treatment is a procedure or therapy that is specifically designed to improve the texture and appearance of your skin to tackle concerns like pigmentation, wrinkles, ageing and also dullness. Facial rejuvenation treatment can range from non-invasive skin care treatments to surgical options for more dramatic and fascinating results.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900">Cutting-Edge Innovations in Facial Rejuvenation Treatment</h2>

                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-rose-400" />
                        <div>
                            <span className="font-medium text-gray-900">HydraFacial – The Ultimate Glow Getter:</span>
                            <span className="text-gray-600"> This treatment is famous for deep cleaning, exfoliating and hydrating your skin in one go.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-rose-400" />
                        <div>
                            <span className="font-medium text-gray-900">Microneedling with Radiofrequency (RF):</span>
                            <span className="text-gray-600"> Uses tiny needles to create controlled treatment of your skin to stimulate collagen production.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-rose-400" />
                        <div>
                            <span className="font-medium text-gray-900">LED Light Therapy:</span>
                            <span className="text-gray-600"> Different wavelengths of lights are used to target specific areas of your face to address problems.</span>
                        </div>
                    </li>
                </ul>

                {/* Testimonial */}
                <blockquote className="my-8 border-l-4 border-rose-400 bg-rose-50 p-6">
                    <p className="mb-2 text-lg italic text-gray-700">
                        "The journey of having radiant and glowing skin begins with choosing the right clinic and the right treatment. With the latest innovations available, there has never been a better time to invest in your own self."
                    </p>
                    <footer className="text-sm text-gray-600">
                        — Panacea Health and Beauty Clinic
                    </footer>
                </blockquote>

                {/* Additional Content */}
                <h2 className="text-2xl font-semibold text-gray-900">Actual Skincare Beyond Treatments</h2>
                <p className="text-gray-600">
                    Facial rejuvenation treatment can give you a fresh start where your skin is plumped, hydrated and radiating but the actual task comes after where maintaining those results requires a long and ongoing care.
                </p>

                {/* Images Grid */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                            src="/services1/wrinke.jpg"
                            alt="Facial rejuvenation procedure"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                            src="/services1/skinbooster.jpg"
                            alt="Skincare treatment results"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </article>
            <section className='my-10'>
                {/* Comment Form */}
                <div>
                    <h3 className="mb-6 text-xl font-semibold text-gray-900">Leave A Reply</h3>
                    <p className="mb-6 text-sm text-gray-500">
                        Your email address will not be published. Required fields are marked *
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name, Email, Website Grid */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name *"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email *"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <input
                                    type="url"
                                    placeholder="Website"
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Comment Textarea */}
                        <div>
                            <textarea
                                placeholder="Comment *"
                                required
                                rows={5}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-400 focus:outline-none"
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            />
                        </div>

                        {/* Remember Me Checkbox */}
                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm text-gray-600">
                                    Save my name, email, and website in this browser for the next time I comment.
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="rounded-md bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600"
                        >
                            Post Comment
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}