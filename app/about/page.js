import Image from "next/image";
import Link from "next/link";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-12 lg:gap-x-24 lg:gap-y-32 items-center">
      <div className="lg:col-span-8">
        <h1 className="text-3xl mb-10 text-amber-300 font-medium">
          Welcome to The Wild Resort
        </h1>
        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our 8 luxury cabins provide a cozy base, but the real freedom and
            peace you&apos;ll find in the surrounding mountains. Wander through
            lush forests, breathe in the fresh air, and watch the stars twinkle
            above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
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
            Since 1962, The wild resort has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The wild resort,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            wild resort soon, where tradition meets tranquility, and every visit
            is like coming home.
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
