import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = { title: "Profile" };

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-3xl mx-auto">
      <h2 className="text-amber-200 text-xl sm:text-2xl mb-3 sm:mb-4">
        Update your guest profile
      </h2>
      <p className="text-base sm:text-lg mb-4 sm:mb-8 text-slate-200">
        Providing the following information will make your check-in process
        faster and smoother.
      </p>
      <UpdateProfileForm guest={guest}>
        <SelectCountry country={guest.country} />
      </UpdateProfileForm>
    </div>
  );
}