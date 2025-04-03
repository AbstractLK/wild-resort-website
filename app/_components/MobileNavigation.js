'use client';

import { useState } from 'react';
import Link from 'next/link';

const MobileNavigation = ({ session }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-slate-200 focus:outline-none"
                aria-label="Toggle menu"
            >
                {!isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-0 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-20">
                    <Link href="/" onClick={() => setIsOpen(!isOpen)} className="block px-4 py-2 text-slate-200 hover:bg-slate-700">
                        Home
                    </Link>
                    <Link href="/cabins" onClick={() => setIsOpen(!isOpen)} className="block px-4 py-2 text-slate-200 hover:bg-slate-700">
                        Cabins
                    </Link>
                    <Link href="/about" onClick={() => setIsOpen(!isOpen)} className="block px-4 py-2 text-slate-200 hover:bg-slate-700">
                        About
                    </Link>
                    <Link href="/account" onClick={() => setIsOpen(!isOpen)} className="block px-4 py-2 text-slate-200 hover:bg-slate-700">
                        {session?.user?.image ? (
                            <div className="flex items-center gap-2">
                                <span>{session.user.name}</span>
                                <img src={session.user.image} alt={session.user.name} className='rounded-full h-6 w-6' referrerPolicy='no-referrer' />
                            </div>
                        ) : (
                            "Guest area"
                        )}
                    </Link>
                </div>
            )}
        </>
    );
};

export default MobileNavigation;