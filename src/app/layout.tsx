import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/siteSettings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.site_title,
    description: settings.site_description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const cssVars = {
    "--primary": settings.primary_color,
    "--primary-hover": settings.secondary_color,
    "--font": settings.font_style,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body className="relative min-h-screen" style={cssVars}>
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
        <main className="flex justify-center items-start mt-[140px]">
          {children}
        </main>
      </body>
    </html>
  );
}
