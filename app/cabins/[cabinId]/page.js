import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

// This function gets called at build time. It defines which paths should be pre-rendered as HTML pages.
// For example, if you have a page that uses dynamic routes like /cabins/[id], this function tells Next.js what HTML to generate for /cabins/1, /cabins/2, etc.
// function name generateStaticParams is required for this function to work
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  
  // console.log(cabin);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-amber-400">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
