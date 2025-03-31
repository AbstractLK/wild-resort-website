import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="text-2xl mb-7 text-amber-100">Your reservations</h2>
      {bookings.length === 0 ? (
        <p className="text-lg">
        You have no reservations yet. Check out our <a href="/cabins" className="underline text-amber-400">luxury cabins &rarr;</a>
      </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard key={booking.id} booking={booking} />
          ))}
        </ul>
      )}
      
    </div>
  );
}
