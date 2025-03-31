"use client";

import React, { useState } from "react";
import { updateGuestProfile } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({ guest, children }) {

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
        <SubmitButton pendingText="Updating...">
          Update profile
        </SubmitButton>
      </div>
    </form>
  );
}
