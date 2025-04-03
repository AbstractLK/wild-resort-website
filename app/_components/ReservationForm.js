"use client";

import React from "react";
import { useReservation } from "./ReservationContext";
import { createReservation } from "../_lib/actions";
import { differenceInDays } from "date-fns";
import SubmitButton from "./SubmitButton";

export default function ReservationForm({ cabin, user }) {
  const { id, maxCapacity, regularPrice, discount } = cabin;
  const { range, resetRange } = useReservation();

  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id
  }

  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div>
      <div className="bg-slate-700 text-slate-300 px-4 sm:px-16 py-2 flex flex-col sm:flex-row justify-between items-center">
        <p className="mb-2 sm:mb-0">Logged in as </p>
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
      {/* <div className="px-4 py-2 text-center sm:text-left">
        {range.from && <span>From: {range.from.toLocaleDateString()}</span>}
        {range.to && <span> To: {range.to.toLocaleDateString()}</span>}
      </div> */}
      <form action={async (formData) => {
        await createReservationWithData(formData);
        resetRange();
      }} className="bg-slate-800 py-6 sm:py-10 px-4 sm:px-16 text-lg flex flex-col gap-5">
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
        <div className="flex justify-center sm:justify-end items-center gap-6">
          {
            (startDate && endDate) ? (
              <SubmitButton pendingText='reserving...'>
                Reserve now
              </SubmitButton>
            ) : (
              <p className="text-slate-300 text-base">Start by selecting dates</p>
            )
          }
        </div>
      </form>
    </div>
  );
}
