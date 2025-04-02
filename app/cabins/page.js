import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import CabinList from "../_components/CabinList";
import FilterButtons from "@/app/_components/FilterButtons";
import ReservationReminder from "@/app/_components/ReservationReminder";

export const revalidate = 3600; // revalidate every 1 hour

export const metadata = {
  title: "Cabins",
};

export default async function Page({searchParams}) {

  const searchParamsData = await searchParams;
  // If searchParams is null or undefined, the expression searchParams?.capacity will return undefined instead of throwing an error.
  // In this case, if searchParams?.capacity is null or undefined, the expression will evaluate to 'all' as default value.
  const filter = searchParamsData?.capacity ?? "all";

  return (
    <div className="max-w-6xl xl:max-w-7xl mx-auto">
      <h1 className="text-3xl mb-5 text-amber-300 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-slate-300 text-base mb-10">
      Nestled in the heart of Sri Lanka&apos;s breathtaking Ella region, our luxurious cabins offer an unparalleled escape into nature. Wake up to panoramic views of misty mountains, immerse yourself in the lush wilderness, or unwind in your private hot tub beneath a starlit sky. Whether you seek adventure or tranquility, our elegantly designed cabins provide the perfect blend of comfort and serenity. Experience the untouched beauty of Ella in your own private retreat—where nature meets luxury.
      </p>

      <div className="flex justify-end mb-8">
        <FilterButtons />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
