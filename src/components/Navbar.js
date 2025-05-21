"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut, BookOpen, Award } from "lucide-react";
import { usePathname } from 'next/navigation';
import FullscreenButton from "./WindowMax";


export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [hideTimeout, setHideTimeout] = useState(null);

    const handleMouseEnter = () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            setHideTimeout(null);
        }
        setProfileDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setProfileDropdownOpen(false);
        }, 200); // small delay (ms) to allow user to move into dropdown
        setHideTimeout(timeout);
    };
    const dropdownRef = useRef(null);

    const pathname = usePathname();
    const hideNavbar = pathname === '/';

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setProfileDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {!hideNavbar &&
                <div className="bg-gradient2 text-white shadow-md">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/* Logo - Left Side */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/dashboard/" className="flex items-center">
                                    <Image src="/logo-only.png" alt="Logo" width={50} height={50} />
                                    {/* <span className="ml-2 text-xl font-semibold">C2I</span> */}
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex lg:flex items-center space-x-4">
                                <Link href="/courses" className="px-3 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors">
                                    My Courses
                                </Link>
                                <Link href="/quizzes" className="px-3 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors">
                                    My Quizzes                                </Link>

                                {/* Profile Dropdown */}
                                <div
                                    className="relative z-40"
                                    ref={dropdownRef}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button
                                        className="flex items-center justify-center h-10 w-10 rounded-full bg-[#333] hover:bg-[#444] focus:outline-none"
                                        onClick={() => setProfileDropdownOpen((prev) => !prev)}
                                        aria-haspopup="true"
                                        aria-expanded={profileDropdownOpen}
                                    >
                                        <div className="relative h-8 w-8 rounded-full overflow-hidden bg-[#444] flex items-center justify-center">
                                            <span className="text-xl font-bold">A</span>
                                        </div>
                                    </button>

                                    {profileDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-[#333] rounded-md shadow-lg py-1 z-10">
                                            <div className="px-4 py-2 border-b border-[#444]">
                                                <p className="font-medium">Hi, Anay</p>
                                                <p className="text-sm text-gray-300">Welcome back</p>
                                            </div>
                                            <Link href="/profile" className="px-4 py-2 hover:bg-[#444] transition-colors flex items-center">
                                                <User className="h-4 w-4 mr-2" />
                                                My Profile
                                            </Link>
                                            <Link href="/results" className="px-4 py-2 hover:bg-[#444] transition-colors flex items-center">
                                                <Award className="h-4 w-4 mr-2" />
                                                My Results
                                            </Link>
                                            <Link href="/interests" className="px-4 py-2 hover:bg-[#444] transition-colors flex items-center">
                                                <BookOpen className="h-4 w-4 mr-2" />
                                                My Interests
                                            </Link>
                                            <button className="w-full text-left px-4 py-2 hover:bg-[#444] transition-colors flex items-center text-red-400">
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Logout
                                            </button>
                                        </div>

                                    )}
                                </div>
                                <FullscreenButton />

                            </div>

                            {/* Mobile Menu Button */}
                            <div className="flex md:hidden lg:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#3a3a3a] focus:outline-none"
                                    aria-expanded={mobileMenuOpen}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {mobileMenuOpen ? (
                                        <X className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Menu className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <div className="flex items-center space-x-3 px-3 py-2">
                                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[#444] flex items-center justify-center">
                                        <span className="text-xl font-bold">A</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Hi, Anay</p>
                                        <p className="text-sm text-gray-300">Welcome back</p>
                                    </div>
                                </div>

                                <div className="border-t border-[#444] pt-2 mt-2">
                                    <Link href="/courses" className="px-3 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors flex items-center">
                                        <BookOpen className="h-5 w-5 mr-3" />
                                        My Courses
                                    </Link>
                                    <Link href="//quizzes" className="px-3 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors flex items-center">
                                        <BookOpen className="h-5 w-5 mr-3" />
                                        My Quizzes
                                    </Link>
                                    <Link href="/profile" className="px-3 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors flex items-center">
                                        <User className="h-5 w-5 mr-3" />
                                        My Profile
                                    </Link>
                                    <Link href="/results" className="px-3 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors flex items-center">
                                        <Award className="h-5 w-5 mr-3" />
                                        My Results
                                    </Link>

                                    <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors flex items-center text-red-400">
                                        <LogOut className="h-5 w-5 mr-3" />
                                        Logout
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
}
