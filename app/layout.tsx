import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PAGANI ZONDA R | Pure Track Art",
  description: "Experience the track-focused hypercar masterpiece, the Pagani Zonda R. A premium scrollytelling interactive showcase featuring mechanical specs and carbon fiber monocoque aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} scroll-smooth`}>
      <body className="bg-pagani-black text-white antialiased font-body min-h-screen">
        {children}
      </body>
    </html>
  );
}

