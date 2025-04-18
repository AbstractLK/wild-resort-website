import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export default async function CabinList({ filter }) {
  // noStore();

  const cabins = await getCabins();
  if (!cabins) return null;

  let displayCabins = null;
  if (filter == "large") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  } else if (filter == "medium") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
  } else if (filter == "small") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 2 && cabin.maxCapacity <= 3);
  } else displayCabins = cabins;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}