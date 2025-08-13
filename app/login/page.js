import React from 'react'
import SignInButton from '../_components/SignInButton';

export const metadata = {
    title: "Sign In"
}

export default function page() {
  return (
    <div className="flex flex-col gap-6 sm:gap-10 mt-6 sm:mt-10 items-center px-4 sm:px-6 text-center max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        Sign in to access your guest area!
      </h2>
      <SignInButton className="w-full sm:w-auto" />
    </div>
  );
}
