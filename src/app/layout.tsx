import type { Metadata } from "next";
import { display, sans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dhanvesttor.com"),
  title: { default: "Dhanvesttor | Portfolio Management, Mutual Funds & CLCB", template: "%s | Dhanvesttor" },
  description:
    "Dhanvesttor is a SEBI-registered portfolio manager in Kolkata. Personal portfolios, curated mutual funds and a community that teaches the language of money.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
