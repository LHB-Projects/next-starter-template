import "../globals.css";
import { getSiteSettings } from "@/lib/siteSettings";

export default async function AuthLayout({
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
      <body style={{ ...cssVars, margin: 0, padding: 0, overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}