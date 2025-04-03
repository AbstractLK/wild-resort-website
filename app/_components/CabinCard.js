import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col md:flex-row border border-slate-800">
      <div className="w-full md:w-2/5 relative aspect-video md:border-r border-slate-800">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="w-full md:w-3/5">
        <div className="pt-4 md:pt-5 pb-3 md:pb-4 px-3 md:px-4 bg-slate-950">
          <h3 className="text-amber-300 font-semibold text-xl md:text-2xl mb-2 md:mb-3">Cabin {name}</h3>
          <div className="flex gap-2 items-center mb-2 md:mb-3">
            <UsersIcon className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
            <p className="text-base md:text-lg text-slate-200">For up to <span className="font-bold">{maxCapacity}</span> guests</p>
          </div>
          <p className="flex gap-2 md:gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl md:text-2xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600 text-sm md:text-base">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl md:text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200 text-sm md:text-base">/ night</span>
          </p>
        </div>
        <div className="bg-slate-950 border-t border-slate-800 text-center md:text-right">
          <Link href={`/cabins/${id}`} className="block md:inline-block py-3 md:py-4 px-4 md:px-6 md:border-l md:border-slate-800 hover:bg-amber-600 hover:text-slate-900 transition-all">
          Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
