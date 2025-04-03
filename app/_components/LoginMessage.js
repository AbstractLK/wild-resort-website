import React from 'react'

export default function LoginMessage() {
  return (
    <div className='grid bg-slate-800 py-8 sm:py-12'>
      <p className='text-center text-xl self-center px-4'>
        Please{' '}
        <a href='/login' className='underline text-amber-500'>
          login
        </a>{' '}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  )
}
