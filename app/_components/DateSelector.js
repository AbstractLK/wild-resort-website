"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DateSelector({cabin, settings, bookedDates}) {
  // CHANGE
  const regularPrice = 23;
  const discount = 3;
  const numNights = 2;
  const cabinPrice = 23;
//   const range = { from: null, to: null };

  // SETTINGS
  const {minBookingLength, maxBookingLength} = settings;

  return (
    <div className="flex flex-col justify-between border border-slate-800">
        
      <DayPicker
        className="pt-10 pb-5 place-self-center text-slate-400"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={1}
      />
      <div className="flex items-center justify-between px-8 bg-amber-500 text-slate-800 h-[60px]">
        <div className="flex items-baseline gap-6">
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
                <span className="text-2xl font-semibold">${cabinPrice*numNights}</span>
              </p>
            </>
          ) : null}
        </div>
        {/* {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null} */}
      </div>
    </div>
  );
}
