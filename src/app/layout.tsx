import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import SideNav from "@/components/header/SideNav";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/sonner"

import '@/style/globals.css';


const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assessment App",
  description: "Assessment App is a simple app to assess My knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex ")}>
        <SideNav className='hidden md:block fixed top-0 left-0 h-full' />
        <section className="w-full p-0 md:pl-16">
          <Header />
          {children}
        </section>
        <Toaster richColors />
      </body>
    </html>
  );
}
