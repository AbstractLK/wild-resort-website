"use client";

import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservation } from './ReservationContext';

export default function ReservationReminder() {
    const {range, resetRange} = useReservation();

    if (!range.from || !range.to) return null;

    return (
      <div className='fixed bottom-6 left-0 md:left-1/2 right-0 md:right-auto w-full md:w-auto md:-translate-x-1/2 py-3 md:py-5 px-4 md:px-8 rounded-full bg-amber-500 text-slate-800 font-semibold shadow-xl shadow-slate-900 flex gap-2 md:gap-8 items-center text-center md:text-left'>
        <p className="text-sm md:text-base">
          <span>👋</span> Don&apos;t forget to reserve your dates <br className="hidden md:block" /> from{' '}
          {format(new Date(range.from), 'MMM dd yyyy')} to{' '}
          {format(new Date(range.to), 'MMM dd yyyy')}
        </p>
        <button onClick={resetRange} className='rounded-full p-1 hover:bg-amber-600 transition-all'>
          <XMarkIcon className='h-5 w-5' />
        </button>
      </div>
    );
}
