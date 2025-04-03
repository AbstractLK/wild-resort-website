"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import { format, formatDistanceToNow, isPast, isToday } from "date-fns";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import SpinnerMini from "./SpinnerMini";

export default function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    if(confirm("Are you sure you want to delete this reservation?")){
      startTransition(() => onDelete(id));
    }
  }

  // Format dates once to avoid repeated calculations
  const formattedStartDate = format(new Date(startDate), "EEE, dd MMM yyyy");
  const formattedEndDate = format(new Date(endDate), "EEE, dd MMM yyyy");
  const formattedCreatedDate = format(new Date(created_at), "EEE, dd MMM yyyy");
  const isStartDatePast = isPast(new Date(startDate));
  const isStartDateToday = isToday(new Date(startDate));
  const timeToStart = isStartDateToday ? "Today" : formatDistanceToNow(startDate);

  return (
    <div className="flex flex-col sm:flex-row border border-slate-800">
      {/* Image - Full width on mobile, fixed size on desktop */}
      <div className="w-full sm:w-auto sm:h-32 relative aspect-video sm:aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover border-b sm:border-b-0 sm:border-r border-slate-800"
        />
      </div>
      
      {/* Details - Responsive layout and spacing */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <h3 className="text-lg sm:text-xl font-semibold">
            {numNights} nights in cabin {name}
          </h3>
          {isStartDatePast ? (
            <span className="self-start sm:self-auto bg-yellow-800 text-yellow-200 h-6 sm:h-7 px-2 sm:px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="self-start sm:self-auto bg-green-800 text-green-200 h-6 sm:h-7 px-2 sm:px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>
        
        <p className="text-sm sm:text-base text-slate-300 mt-1 sm:mt-0">
          {formattedStartDate} ({timeToStart}) &mdash; {formattedEndDate}
        </p>
        
        {/* Bottom details row - Responsive stack on mobile */}
        <div className="flex flex-wrap gap-3 sm:gap-5 mt-2 sm:mt-auto items-center">
          <p className="text-lg sm:text-xl font-semibold text-amber-400">${totalPrice}</p>
          <p className="hidden sm:block">|</p>
          <p className="text-base sm:text-lg text-amber-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="w-full sm:w-auto sm:ml-auto text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0">
            Booked {formattedCreatedDate}
          </p>
        </div>
      </div>
      
      {/* Action buttons - Horizontal on mobile, vertical on desktop */}
      <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-slate-800 sm:w-[100px]">
        {!isStartDatePast && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="flex flex-1 sm:flex-grow items-center justify-center sm:justify-start gap-1 sm:gap-2 uppercase text-xs font-bold text-slate-300 sm:border-b sm:border-slate-800 p-3 sm:px-3 hover:bg-amber-600 transition-colors hover:text-slate-900"
            >
              <PencilSquareIcon className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 hover:text-slate-800 transition-colors" />
              <span className="mt-0 sm:mt-1">Edit</span>
            </Link>
            <button 
              onClick={handleDelete} 
              className="flex flex-1 sm:flex-grow items-center justify-center sm:justify-start gap-1 sm:gap-2 uppercase text-xs font-bold text-slate-300 p-3 sm:px-3 hover:bg-amber-600 transition-colors hover:text-slate-900 border-l sm:border-l-0 border-slate-800"
            >
              {!isPending ? (
                <>
                  <TrashIcon className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
                  <span className="mt-0 sm:mt-1">Delete</span>
                </>
              ) : (
                <span className="flex items-center mx-auto justify-center">
                  <SpinnerMini />
                </span>
              )}
            </button>
          </>
        )}
        {isStartDatePast && (
          <div className="flex-1 text-center p-3 text-xs text-slate-500">
            Past reservation
          </div>
        )}
      </div>
    </div>
  );
}