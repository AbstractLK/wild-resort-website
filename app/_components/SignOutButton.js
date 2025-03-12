import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

function SignOutButton() {
  return (
    <button className='w-full py-3 px-5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors gap-4 font-semibold flex items-center'>
      <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-slate-400" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
