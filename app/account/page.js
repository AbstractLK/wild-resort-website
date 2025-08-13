import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
}

export default async function Page() {
  const session = await auth();

  return (
    <h1 className="text-2xl md:text-3xl font-semibold text-amber-400 mb-4 sm:mb-7">
      Welcome, {session.user.name}!
    </h1>
  );
}