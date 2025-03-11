import Link from 'next/link';

const Navigation = () => {
    return (
        <nav className="p-4 z-10">
            <ul className="flex gap-8 mr-0">
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
                    <Link href="/account" className="text-slate-200 hover:text-amber-400">
                    Guest area
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;