"use client";

import React, { useState } from 'react'

export default function UpdateProfileForm({ children }) {
    const [count, setCount] = useState(0);

  return (
    <form className="bg-slate-700 py-8 px-12 text-lg">
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            className="px-5 py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            className="px-5 py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
          </div>
          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID"
            className="px-5 py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center mt-6">
          <button className="bg-amber-500 px-8 py-4 text-slate-800 font-semibold hover:bg-amber-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update profile
          </button>
        </div>
      </form>
  )
}
