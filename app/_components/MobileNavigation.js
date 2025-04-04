"use client";

import { useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const MobileNavigation = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={handleToggleMenu}
        className="text-slate-200 focus:outline-none"
        aria-label="Toggle menu"
      >
        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-0 pl-3 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-20">
          <Link
            href="/"
            onClick={handleToggleMenu}
            className="block px-4 py-2 text-slate-200 hover:bg-slate-700"
          >
            Home
          </Link>
          <Link
            href="/cabins"
            onClick={handleToggleMenu}
            className="block px-4 py-2 text-slate-200 hover:bg-slate-700"
          >
            Cabins
          </Link>
          <Link
            href="/about"
            onClick={handleToggleMenu}
            className="block px-4 py-2 text-slate-200 hover:bg-slate-700"
          >
            About
          </Link>
          <Link
            href="/account"
            onClick={handleToggleMenu}
            className="block px-4 py-2 text-slate-200 hover:bg-slate-700"
          >
            {session?.user?.image ? (
              <div className="flex items-center gap-2">
                <span>{session.user.name}</span>&nbsp;
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="rounded-full h-6 w-6"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              "Guest area"
            )}
          </Link>
          {session?.user && (
            <div className="border-t border-slate-700">
              <SignOutButton onClick={handleToggleMenu} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileNavigation;