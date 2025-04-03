import SubmitButton from '@/app/_components/SubmitButton';
import { updateGuestBooking } from '@/app/_lib/actions';
import { getBooking, getCabin } from '@/app/_lib/data-service';
import React from 'react'

export default async function Page({params}) {
    const {bookingId} = await params;
    const {cabinId, numGuests, observations} = await getBooking(bookingId);
    const {maxCapacity} = await getCabin(cabinId);

    return (
      <div className="px-4 md:px-6 py-6 max-w-3xl mx-auto">
          <h2 className="font-semibold text-xl sm:text-2xl text-amber-400 mb-4 sm:mb-7">
          Edit Reservation #{bookingId}
        </h2>
        <form action={updateGuestBooking} className='flex flex-col gap-4 sm:gap-6 bg-slate-900 py-6 sm:py-8 px-4 sm:px-12 text-base sm:text-lg rounded-md shadow-md'>
          <div className='hidden'>
            <input name='bookingId' defaultValue={bookingId} />
          </div>
          <div className='space-y-1 sm:space-y-2'>
              <label htmlFor='numGuests' className="block">How many guests?</label>
              <select 
                name='numGuests' 
                defaultValue={numGuests} 
                className='px-3 sm:px-5 py-2 sm:py-3 bg-slate-200 text-slate-800 w-full shadow-sm rounded-sm text-base'
              >
                  <option value='' key=''>Select number of guests...</option>
                  {[...Array(maxCapacity)].map((_, index) => (
                  <option key={index} value={index + 1}>
                      {index + 1} {index + 1 === 1 ? "guest" : "guests"}
                  </option>
                  ))}
              </select>
          </div>
          <div className='space-y-1 sm:space-y-2'>
              <label htmlFor='observations' className="block">Anything we should know about your stay?</label>
              <textarea 
                name='observation' 
                defaultValue={observations} 
                className='px-3 sm:px-5 py-2 sm:py-3 bg-slate-200 text-slate-800 w-full shadow-sm rounded-sm text-base min-h-32'
              />
          </div>
          <div className='flex justify-end mt-2'>
              <SubmitButton pendingText="Updating...">
                Update reservation
              </SubmitButton>
          </div>
        </form>
      </div>
    )
}
