"use client";

import React, { useState } from "react";
import { updateGuestProfile } from "../_lib/actions";
import { useFormStatus } from "react-dom";

export default function UpdateProfileForm({ guest, children }) {
  
  const Button = () => {
    const { pending } = useFormStatus();
    return (
      <button
        className="bg-amber-500 px-8 py-4 text-slate-800 font-semibold hover:bg-amber-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        disabled={pending}
      >
        {pending ? "Updating..." : "Update profile"}
      </button>
    );
  };

  return (
    <form
      action={updateGuestProfile}
      className="bg-slate-700 py-8 px-12 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={guest.fullName}
          name="fullName"
          className="px-5 py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={guest.email}
          name="email"
          className="px-5 py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest.nationalID}
          className="px-5 py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center mt-6">
        <Button />
      </div>
    </form>
  );
}
