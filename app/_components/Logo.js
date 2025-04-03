import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
      <Link href="/" className="flex items-center gap-2 md:gap-4 z-10">
        <Image src={logo} width="45" height="45" alt="logo" className="w-10 h-10 md:w-[60px] md:h-auto" />
        <span className="text-xl md:text-xl font-semibold text-slate-200">The Wild Resort</span>
      </Link>
  );
}

export default Logo;
