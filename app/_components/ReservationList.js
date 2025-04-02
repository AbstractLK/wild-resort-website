"use client";

import React, { useOptimistic } from 'react'
import ReservationCard from './ReservationCard'
import { deleteReservation } from '../_lib/actions';

export default function ReservationList({bookings}) {

    const handleDelete = async (bookingId) => {
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }

    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currentBookings, bookingId) => {
        return currentBookings.filter((booking) => booking.id !== bookingId);
    });

    

  return (
    <ul className="space-y-10">
        {optimisticBookings.map((booking) => (
        <ReservationCard key={booking.id} booking={booking} onDelete={handleDelete} />
        ))}
    </ul>
  )
}
