import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div className="px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl mb-4 sm:mb-7 text-amber-100">Your reservations</h2>
      {bookings.length === 0 ? (
        <p className="text-base sm:text-lg">
          You have no reservations yet. Check out our <a href="/cabins" className="underline text-amber-400">luxury cabins &rarr;</a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
