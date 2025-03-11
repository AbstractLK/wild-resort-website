import Header from "./_components/Header";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

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
        className={`${josefin.className} bg-slate-900 text-slate-200 min-h-screen flex flex-col `}
      >
        <Header/>
        <div className="flex-1 px-8 py-12 ">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
