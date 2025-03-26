import React from 'react'

export default function LoginMessage() {
    return (
        <div className='grid bg-slate-800 '>
          <p className='text-center text-xl py-12 self-center'>
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
