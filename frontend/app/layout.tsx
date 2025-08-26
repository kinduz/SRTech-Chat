import "./globals.css";
import type { Metadata } from "next";
import { I18nInitializer } from "../src/shared/i18n";

export const metadata: Metadata = {
  title: "SRTech Date",
  description: "A Next.js app for SRTech Date",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <I18nInitializer />
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          {children}
        </div>
      </body>
    </html>
  );
}
