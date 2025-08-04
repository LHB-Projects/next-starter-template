import "./globals.css";
import type { Metadata } from "next"; // ✅ add this
import Image from "next/image";

export const metadata: Metadata = { // type annotation
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
      <body>
        <header className="p-4 flex justify-center bg-white shadow">
          <Image
            src="/logo.png"
            alt="J. Michael's Prime Logo"
            width={250}
            height={100}
            priority
          />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
