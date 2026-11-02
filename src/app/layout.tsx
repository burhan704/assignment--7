import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PriceTicker from "@/components/PriceTicker";
import { Toaster } from "sonner";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দৈনিক বাজারদর।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light">
      <body
        className={`${hindSiliguri.className} flex min-h-screen flex-col antialiased`}
      >
        <Navbar />
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              className="h-9 border-b border-gray-200 bg-white"
            />
          }
        >
          <PriceTicker />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
