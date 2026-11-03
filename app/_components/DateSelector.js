"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";

function isAlreadyBooked(range, datesArr) {
  if (!range?.from || !range?.to || !datesArr?.length) return false;

  return datesArr.some((date) =>
    isWithinInterval(new Date(date), { start: range.from, end: range.to })
  );
}

export default function DateSelector({ cabin, settings, bookedDates = [] }) {
  const { range, setRange, resetRange } = useReservation();

  const currentRange = range || { from: undefined, to: undefined };
  const displayRange = isAlreadyBooked(currentRange, bookedDates)
    ? { from: undefined, to: undefined }
    : currentRange;

  const { minBookingLength = 1, maxBookingLength = 30 } = settings || {};
  const { regularPrice = 0, discount = 0 } = cabin || {};

  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

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
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDates?.some((date) => isSameDay(new Date(date), currDate))
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
          {numNights > 0 ? (
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
        {currentRange?.from || currentRange?.to ? (
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
