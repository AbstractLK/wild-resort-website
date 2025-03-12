export const metadata = {
  title: "Reservations",
};

export default function Page() {
  const bookings = [];

  return (
    <div>
      <h2 className="text-2xl mb-7 text-amber-100">Your reservations</h2>
      <p className="text-lg">
        You have no reservations yet. Check out our <a href="/cabins" className="underline text-amber-400">luxury cabins &rarr;</a>
      </p>
    </div>
  );
}
