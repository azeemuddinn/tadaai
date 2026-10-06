import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ta-da — Make it a moment they’ll remember.",
  description: "Thoughtful surprise plans for very good people.",
  // themeColor: "#ffeef2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="bg-[var(--paper)] text-[var(--ink)] font-manrope antialiased selection:bg-[var(--mango)] selection:text-white">
        {children}
      </body>
    </html>
  );
}
