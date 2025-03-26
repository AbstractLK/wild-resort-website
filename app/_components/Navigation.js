import Link from 'next/link';
import { auth } from '../_lib/auth';

const Navigation = async () => {
    const session = await auth();
    // console.log(session);

    return (
        <nav className="p-4 z-10">
            <ul className="flex gap-8 mr-0 items-center">
                <li>
                    <Link href="/" className="text-slate-200 hover:text-amber-400 transition-colors">
                       Home
                    </Link>
                </li>
                <li>
                    <Link href="/cabins" className="text-slate-200 hover:text-amber-400">
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-slate-200 hover:text-amber-400">
                        About
                    </Link>
                </li>
                <li>
                    {session?.user?.image ? (
                        <Link href="/account" className="text-slate-200 hover:text-amber-400 flex gap-3 items-center">
                            <img src={session.user.image} alt={session.user.name} className='rounded-full h-8' referrerPolicy='no-referrer' />
                            <span>{session.user.name}</span> 
                        </Link>
                    ) : (
                        <Link href="/account" className="text-slate-200 hover:text-amber-400">
                    Guest area
                    </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;