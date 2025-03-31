"use client";

import { useFormStatus } from 'react-dom';

export default function SubmitButton({pendingText, children}) {
  const { pending } = useFormStatus();

      return (
        <button
          className="bg-amber-500 px-8 py-4 text-slate-800 font-semibold hover:bg-amber-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          disabled={pending}
        >
          {pending ? pendingText : children}
        </button>
      );
}
