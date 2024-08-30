import { useSidebarContext } from '@/context/SidebarContext';
import Link from 'next/link';
import React from 'react'

const Home = () => {
    const { isExpanded } = useSidebarContext();
  return (
    <>
    
    <li>
                        <Link
                            href="/dashboard/home"
                            className={`flex h-12 items-center text-gray-300 border-l-4 border-transparent p-4 pl-5 ${isExpanded
                                    ? "hover:bg-gray-400/20  hover:border-blue-500"
                                    : "pointer-events-none cursor-none"
                                }`} >                            
                            <svg
                                className="flex-shrink-0 w-6 h-6 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none">
 
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                            </svg>
                            <span className={`font-[500] ml-3 transition-all duration-700 delay-200 ${isExpanded ? "opacity-100" : "opacity-0" }`} >
                                Home
                            </span>
                        </Link>
                    </li>
    </>
  )
}

export default Home