import SubmitButton from '@/app/_components/SubmitButton';
import { updateGuestBooking } from '@/app/_lib/actions';
import { getBooking, getCabin } from '@/app/_lib/data-service';
import React from 'react'

export default async function Page({params}) {
    const {bookingId} = await params;
    const {cabinId, numGuests, observations} = await getBooking(bookingId);
    const {maxCapacity} = await getCabin(cabinId);

  return (
    <div>
        <h2 className="font-semibold text-2xl text-amber-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>
      <form action={updateGuestBooking} className='flex flex-col gap-6 bg-slate-900 py-8 px-12 text-lg'>
        <div className='hidden'>
          <input name='bookingId' defaultValue={bookingId} />
        </div>
        <div className='space-y-2'>
            <label htmlFor='numGuests'>How many guests?</label>
            <select name='numGuests' defaultValue={numGuests} className='px-5 py-3 bg-slate-200 text-slate-800 w-full shadow-sm rounded-sm'>
                <option value='' key=''>Select number of guests...</option>
                {[...Array(maxCapacity)].map((_, index) => (
                <option key={index} value={index + 1}>
                    {index + 1} {index + 1 === 1 ? "guest" : "guests"}
                </option>
                ))}
            </select>
        </div>
        <div className='space-y-2'>
            <label htmlFor='observations'>Anything we should know about your stay?</label>
            <textarea name='observation' defaultValue={observations} className='px-5 py-3 bg-slate-200 text-slate-800 w-full shadow-sm rounded-sm' />
        </div>
        <div className='flex justify-end'>
            <SubmitButton pendingText="Updating...">
              Update reservation
            </SubmitButton>
        </div>
      </form>
    </div>
  )
}
