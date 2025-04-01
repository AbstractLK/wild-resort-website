import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-40">
      <Spinner />
      <p className="text-lg text-slate-200">&nbsp;&nbsp;Loading Data...</p>
    </div>
  );
}