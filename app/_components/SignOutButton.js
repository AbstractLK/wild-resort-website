import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOutAction } from '../_lib/actions';

function SignOutButton({ onClick }) {
  return (
    <form action={signOutAction}>
      <button 
        onClick={onClick}
        className='w-full py-2 lg:py-3 px-3 lg:px-5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors gap-2 lg:gap-4 font-semibold flex items-center'
      >
        <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-slate-400" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;