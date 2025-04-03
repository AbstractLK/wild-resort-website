import React from 'react'
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "@/app/_components/TextExpander";
import Image from "next/image";

export default function Cabin({cabin}) {
    const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;

    return (
      <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-6 md:gap-20 border border-primary-800 py-3 px-4 sm:px-10 mb-12 md:mb-24">
          <div className="relative w-full h-[250px] md:h-auto md:scale-[1.15] md:-translate-x-3">
            <Image
              src={image}
              alt={`Cabin ${name}`}
              fill
              className="object-cover"
            />
          </div>
  
          <div className="mt-4 md:mt-0">
            <h3 className="text-amber-200 font-black text-4xl sm:text-5xl md:text-7xl mb-5 md:translate-x-[-254px] bg-slate-950 p-3 sm:p-6 sm:pb-1 w-full md:w-[150%]">
              Cabin {name}
            </h3>
  
            <div className="text-base text-slate-300 mb-6 md:mb-10">
              <TextExpander>{description}</TextExpander>
            </div>
  
            <ul className="flex flex-col gap-4 mb-7">
              <li className="flex gap-3 items-center">
                <UsersIcon className="h-5 w-5 text-slate-600" />
                <span className="text-lg">
                  For up to <span className="font-bold">{maxCapacity}</span>{" "}
                  guests
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <MapPinIcon className="h-5 w-5 text-slate-600" />
                <span className="text-lg">
                  Located in the{" "}
                  <span className="font-bold">Ella</span> (Sri Lanka)
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <EyeSlashIcon className="h-5 w-5 text-slate-600" />
                <span className="text-lg">
                  Privacy <span className="font-bold">100%</span> guaranteed
                </span>
              </li>
            </ul>
          </div>
        </div>
    )
}
