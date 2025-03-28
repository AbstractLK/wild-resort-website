"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestProfile(formData){
  const session = await auth();
  if(!session) throw new Error("You must be logged in");

  const country = formData.get("country");
  const nationalID = formData.get("nationalID");
  const updatedData = {country, nationalID};

  await updateGuest(session.user.guestId, updatedData);
  revalidatePath("/account/profile");
  
}