"use client";

import React from "react";
import { useReservation } from "./ReservationContext";

export default function ReservationForm({ cabin, user }) {
  const { maxCapacity } = cabin;
  const { range } = useReservation();

  return (
    <div>
      <div className="bg-slate-700 text-slate-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as </p>
        <div className='flex gap-4 items-center'>
          <p> {user.name}</p>
          <img
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
        </div>
      </div>
      {range.from && <span>From: {range.from.toLocaleDateString()}</span>}
      {range.to && <span> To: {range.to.toLocaleDateString()}</span>}
      <form className="bg-slate-800 py-10 px-16 text-lg flex flex-col gap-5">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            className="px-5 py-3 bg-slate-200 text-slate-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="">Select number of guests...</option>
            {[...Array(maxCapacity)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1} {index + 1 === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-slate-200 text-slate-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>
        <div className="flex justify-end items-center gap-6">
          <p className="text-slate-300 text-base">Start by selecting dates</p>
          <button className="bg-amber-500 px-8 py-4 text-slate-800 font-semibold hover:bg-amber-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}
