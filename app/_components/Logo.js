import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
      <Link href="/" className="flex items-center gap-4 z-10">
        <Image src={logo} width="60" alt="logo" />
        <span className="text-xl font-semibold text-slate-200">The Wild Resort</span>
      </Link>
  );
}

export default Logo;
