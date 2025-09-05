import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Contact } from "@/components/contact";
import { ProductProvider } from "@/components/provider";


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
  description: "Ferretería y Electrónica",
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

        <ProductProvider>
          {children}
        </ProductProvider>
        <footer>
          <div className="sect-ftr w-full px-8 py-2 mx-auto text-center text-white footer-text">
            <Contact />
            2025 © Ferrelect | Todos los derechos reservados | Dev. Adrian Liy
          </div>
        </footer> 
      </body>
    </html>
  );
}
