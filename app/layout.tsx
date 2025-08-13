import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Contact } from "@/components/contact";
import {MobileNavbar} from "@/components/mobile-navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ferrelect",
  description: "Todo lo que necesitas aquí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Navbar className="hidden md:flex" />
        <MobileNavbar className="flex md:hidden" />
        {children}
        <footer>
          <div className="w-full px-8 py-2 mx-auto text-center text-white bg-gray-600 footer-text">
            <Contact />
            2025 © Ferrelect | Todos los derechos reservados | Dev. Adrian Liy
          </div>
        </footer> 
      </body>
    </html>
  );
}
