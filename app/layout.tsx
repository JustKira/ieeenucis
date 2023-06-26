import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Providers from "@/lib/Providers";
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "IEEE NU CIS",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`font-poppins dark min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
