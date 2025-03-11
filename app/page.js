import Link from "next/link";
import Image from "next/image";
import cover from "@/public/cover1.jpg";

export default function Page() {
  return (
    <div className="mt-24">
      <div>
        <Image src={cover} quality={100} fill placeholder="blur" className="object-cover object-top" alt="cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative text-center">
        <h1 className="text-7xl text-slate-300 mb-10 tracking-tight">
          Welcome to paradise
        </h1>
        <Link
          href="/cabins"
          className="bg-amber-300 px-5 py-4 text-slate-700 text-lg font-semibold hover:bg-amber-500 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}
