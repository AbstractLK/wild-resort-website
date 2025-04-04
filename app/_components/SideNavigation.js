"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "My account",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-slate-400" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-slate-400" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-slate-400" />,
  },
];

function SideNavigation() {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="md:border-r md:border-slate-700 flex flex-col h-fit">
      {/* Mobile Account Navigation Header */}
      <div className="flex justify-between items-center p-4 border-b border-slate-700 md:hidden">
        <h2 className="font-semibold text-lg">Account Menu</h2>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 hover:bg-slate-800 rounded"
        >
          {menuOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-slate-400" />
          )}
        </button>
      </div>

      {/* Navigation Links - Always visible on desktop, toggleable on mobile */}
      <ul className={`flex flex-col gap-2 text-base lg:text-lg flex-grow ${menuOpen ? 'block' : 'hidden'} md:block`}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-2 lg:py-3 px-7 lg:px-5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors flex items-center gap-2 lg:gap-4 font-semibold ${pathName === link.href ? "bg-slate-800 text-slate-200" : ""}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Sign Out Button - Always at the bottom */}
      <div className="mt-96 max-md:hidden border-t border-slate-700">
        <SignOutButton />
      </div>
    </nav>
  );
}

export default SideNavigation;