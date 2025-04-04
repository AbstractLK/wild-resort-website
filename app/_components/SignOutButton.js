import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOutAction } from '../_lib/actions';

function SignOutButton({ onClick }) {
  const handleClick = async (e) => {
    // Prevent default to handle submission manually
    e.preventDefault();
    
    // Run the onClick function passed from the parent
    if (onClick) {
      onClick();
    }
    
    // Submit the form programmatically
    await signOutAction();
  };
  
  return (
    <form>
      <button 
        onClick={handleClick}
        type="button" // Change from implicit submit button to explicit button type
        className='w-full py-2 lg:py-3 px-3 lg:px-5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors gap-2 lg:gap-4 font-semibold flex items-center'
      >
        <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-slate-400" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;