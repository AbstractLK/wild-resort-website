
export const metadata = {
  title: "Cabins",
};

export default function Page() {
  // CHANGE
  const cabins = [];

  return (
    <div className="max-w-6xl xl:max-w-7xl mx-auto">
      <h1 className="text-3xl mb-5 text-amber-300 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-slate-300 text-base mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
    </div>
  );
}
