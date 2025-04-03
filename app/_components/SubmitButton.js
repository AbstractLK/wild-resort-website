"use client";

import { useFormStatus } from 'react-dom';

export default function SubmitButton({pendingText, children}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-amber-500 px-4 sm:px-8 py-3 sm:py-4 text-slate-800 text-sm sm:text-base font-semibold hover:bg-amber-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 rounded w-full sm:w-auto"
      disabled={pending}
    >
      {pending ? pendingText : children}
    </button>
  );
}