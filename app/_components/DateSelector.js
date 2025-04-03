"use client";

import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }) // For the date within the interval
    )
  );
}

export default function DateSelector({ cabin, settings, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { minBookingLength, maxBookingLength } = settings;
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // disabled={[{ before: new Date() }, (currDate) => bookedDates.some((date) => isSameDay(date, currDate))]}

  return (
    <div className="flex flex-col justify-between border border-slate-800 mb-6 lg:mb-0">
      <DayPicker
        className="pt-10 pb-5 place-self-center text-slate-400 w-full overflow-x-auto"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(currDate) => isPast(currDate) || 
          bookedDates.some((date) => isSameDay(date, currDate))
        }
      />
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-0 bg-amber-500 text-slate-800 sm:h-[60px]">
        <div className="flex flex-wrap items-baseline gap-3 sm:gap-6 mb-3 sm:mb-0">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-slate-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-amber-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>
        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
