"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import { format, formatDistanceToNow, isPast, isToday } from "date-fns";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { deleteReservation } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

export default function ReservationCard({ booking }) {
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
      startTransition(() => deleteReservation(id));
    }
  }

  return (
    <div className="flex border border-slate-800">
      <div className="h-32 relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover border-r border-slate-800"
        />
      </div>
      <div className="flex-grow px-6 py-3  ">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>
        <p className="text-lg text-slate-300">
          {format(new Date(startDate), "EEE, dd MMM yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceToNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, dd MMM yyyy")}
        </p>
        <div className="flex gap-5 mt-auto">
          <p className="text-xl font-semibold text-amber-400">${totalPrice}</p>
          <p>|</p>
          <p className="text-lg text-amber-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-slate-400">
            Booked {format(new Date(created_at), "EEE, dd MMM yyyy")}
          </p>
        </div>
      </div>
      <div className="flex flex-col border-l border-slate-800 w-[100px]">
        {isPast(new Date(startDate)) ? (
          ""
        ) : (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className=" flex flex-grow items-center gap-2 uppercase text-xs font-bold text-slate-300 border-b border-slate-800 px-3 hover:bg-amber-600 transition-colors hover:text-slate-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-slate-600 hover:text-slate-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <button onClick={handleDelete} className="flex flex-grow items-center gap-2 uppercase text-xs font-bold text-slate-300 px-3 hover:bg-amber-600 transition-colors hover:text-slate-900">
              {
                !isPending ? (
                  <>
                    <TrashIcon className="h-5 w-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
                    <span className="mt-1">Delete</span>
                  </>
                ) : (
                  <span className="flex items-center mx-auto justify-center">
                    <SpinnerMini />
                  </span>
                )
              }
            </button>
          </>
        )}
      </div>
    </div>
  );
}
