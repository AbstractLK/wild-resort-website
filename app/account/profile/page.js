import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";

export const metadata = { title: "Profile" };

export default function Page() {
  return (
    <div>
      <h2 className="text-amber-200 text-2xl mb-4">
        Update your guest profile
      </h2>
      <p className="text-lg mb-8 text-slate-200">
        Providing the following information will make your check-in process
        faster and smoother.
      </p>
      <UpdateProfileForm>
        <SelectCountry />
      </UpdateProfileForm>
    </div>
  );
}
