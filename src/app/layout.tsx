import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const settings = {
  logo_url: "/logo.png",
  site_title: "J. Michael's Prime",
};

export const metadata: Metadata = {
  title: settings.site_title,
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
    <header className="absolute top-0 left-0 w-full flex justify-center z-50 pointer-events-none">
  <Link href="/dashboard" className="pointer-events-auto">
    <Image
      src={settings.logo_url}
      alt={`${settings.site_title} Logo`}
      width={500}
      height={250}
      priority
      className="cursor-pointer w-auto max-w-[500px] h-auto px-4"
    />
  </Link>
</header>

        {/* Main content shifted down just enough to clear logo */}
        <main className="flex justify-center items-start mt-[64px]">
          {children}
        </main>
      </body>
    </html>
  );
}
