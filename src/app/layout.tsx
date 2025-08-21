import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "J. Michael's Prime",
  description: "Steaks & Seafood",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        {/* Absolutely positioned logo */}
        <header className="absolute top--10 left-0 w-full flex justify-center z-50 pointer-events-none">
          <Link href="/dashboard" className="pointer-events-auto">
            <Image
              src="/logo.png"
              alt="J. Michael's Prime Logo"
              width={500}
              height={250}
              priority
              className="cursor-pointer w-auto max-w-[500px] h-auto px-4"
            />
          </Link>
        </header>

        {/* Main content shifted down just enough to clear logo */}
        <main className="flex justify-center items-start mt-[140px]">
          {children}
        </main>
      </body>
    </html>
  );
}
