"use client";

import React from "react";
import { updateGuestProfile } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({ guest, children }) {
  return (
    <form
      action={updateGuestProfile}
      className="bg-slate-700 py-5 sm:py-8 px-4 sm:px-12 text-base sm:text-lg rounded-md shadow-md"
    >
      <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
        <label className="block">Full name</label>
        <input
          disabled
          defaultValue={guest.fullName}
          name="fullName"
          className="px-3 sm:px-5 py-2 sm:py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
        <label className="block">Email address</label>
        <input
          disabled
          defaultValue={guest.email}
          name="email"
          className="px-3 sm:px-5 py-2 sm:py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <label htmlFor="nationality" className="block">Where are you from?</label>
        </div>
        {children}
      </div>

      <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
        <label htmlFor="nationalID" className="block">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest.nationalID}
          className="px-3 sm:px-5 py-2 sm:py-3 bg-slate-300 text-slate-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center mt-4 sm:mt-6">
        <SubmitButton pendingText="Updating...">
          Update profile
        </SubmitButton>
      </div>
    </form>
  );
}