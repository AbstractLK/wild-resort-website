import Header from "./_components/Header";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The Wild Resort",
    default: "Home | The Wild Resort",
  },
  description: "Luxurious cabin hotel in the heart of the wild",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-slate-900 text-slate-200 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-12 grid">
          <main className="max-w-6xl xl:max-w-full mx-auto w-full">
              <ReservationProvider>
                {children}
              </ReservationProvider>
            </main>
        </div>
      </body>
    </html>
  );
}
