import Image from "next/image";
import Link from "next/link";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400; // revalidate every 24 hours

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-12 lg:gap-x-24 lg:gap-y-32 items-center">
      <div className="lg:col-span-8">
        <h1 className="text-3xl mb-10 text-amber-300 font-medium">
          Welcome to The Wild Resort
        </h1>
        <div className="space-y-8">
          <p>
          Where untamed nature and luxury come together in perfect harmony. Tucked away in Sri Lanka&apos;s pristine wilderness, this is your ultimate escape into tranquility. More than just a stay, it&apos;s an experience—an opportunity to reconnect with nature and create unforgettable moments with loved ones.
          </p>
          <p>
          Our {cabins.length} exclusive luxury cabins offer a cozy yet opulent retreat, but the true magic lies in the wild landscapes that surround you. Wander through dense forests, breathe in the fresh jungle air, and gaze at the starlit sky while unwinding by a crackling fire or soaking in your private plunge pool.
          </p>
          <p>
          Here, time slows down, worries fade, and nature&apos;s beauty takes center stage. Discover the perfect blend of adventure and serenity—your private paradise in the heart of Sri Lanka&apos;s wilderness.
          </p>
        </div>
      </div>
      <div className="lg:col-span-4">
        <Image src={image1} alt="image1" placeholder="blur" quality={80} />
      </div>
    
      <div className="lg:col-span-4 relative aspect-square">
        <Image src="/about-2.jpg" fill alt="image2" className="object-cover" />
      </div>
      <div className="lg:col-span-8">
        <h2 className="text-3xl mb-6 text-amber-300 font-medium">
          Managed by our family since 1962
        </h2>
        <div className="space-y-8">
          <p>
          Since 1962, The Wild Resort has been a treasured family-run sanctuary, deeply rooted in Sri Lanka&apos;s breathtaking wilderness. Founded by our grandparents, this retreat has been lovingly nurtured through generations, ensuring every guest experiences the warmth and care that only a family legacy can provide.
          </p>
          <p>
          Over the years, we have preserved the essence of The Wild Resort—where untouched nature meets heartfelt hospitality. Here, you&apos;re more than just a guest; you become part of our extended family. Come and experience a place where tradition blends with tranquility, and every visit feels like coming home.
          </p>
          <div>
            <Link href="/cabins" className="text-slate-800 mt-4 px-8 py-4 bg-amber-300 hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold">
            Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
