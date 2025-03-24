import Link from 'next/link';

export default function NotFound() {
    return (
        <main className='flex flex-col items-center justify-center gap-4 h-full'>
            <h1 className='text-3xl font-semibold'>This page could not be found :(</h1>
            <Link href='/' className='inline-block bg-amber-500 text-slate-800 px-6 py-3 text-lg'>Go back home</Link>
        </main>
    );
}