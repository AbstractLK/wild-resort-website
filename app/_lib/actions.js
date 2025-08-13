"use server";
import { revalidatePath } from "next/cache";
import {redirect} from 'next/navigation';
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";

export async function signInAction() {
  await signIn("google", { callbackUrl: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const country = formData.get("country");
  const nationalID = formData.get("nationalID");
  const updatedData = { country, nationalID };

  await updateGuest(session.user.guestId, updatedData);
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingId = guestBookings.find(
    (booking) => booking.id === bookingId
  );
  if (!guestBookingId)
    throw new Error("You are not allowed to delete this booking");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateGuestBooking(formData) {
  // Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Autherization
  const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingId = guestBookings.find(
    (booking) => booking.id === bookingId
  );
  if (!guestBookingId) throw new Error("You are not allowed to update this booking");

  // use slice for protect db from sql injection
  const updatedData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observation").slice(0, 500), 
  };

  // Data Mutation
  await updateBooking(bookingId, updatedData);

  revalidatePath('/account/reservations');
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect('/account/reservations');
}

export async function createReservation(bookingData, formData){
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations'),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed'
  }

  createBooking(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankYou');

}