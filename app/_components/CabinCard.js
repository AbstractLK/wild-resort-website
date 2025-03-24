import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border border-slate-800">
      <div className="flex-1 relative aspect-video border-r border-slate-800">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-4 bg-slate-950">
          <h3 className="text-amber-300 font-semibold text-2xl mb-3">Cabin {name}</h3>
          <div className="flex gap-2 items-center mb-3">
            <UsersIcon className="h-5 w-5 text-slate-600" />
            <p className="text-lg text-slate-200">For up to <span className="font-bold">{maxCapacity}</span> guests</p>
          </div>
          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>
        <div className="bg-slate-950 border-t border-top border-slate-800 text-right">
          <Link href={`/cabins/${id}`} className="border-l border-slate-800 py-4 px-6 inline-block hover:bg-amber-600 hover:text-slate-900 transition-all">
          Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
