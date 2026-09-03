import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Pinyon_Script,
  Emilys_Candy,
  Amiri,
  Cormorant_Garamond,
  Charis_SIL,
  Tangerine,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const tangerine = Tangerine({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tangerine",
});

const charisSil = Charis_SIL({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-charis-sil",
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon-script",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const emilysCandy = Emilys_Candy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-emilys-candy",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin", "arabic"],
  variable: "--font-amiri",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaz & Renna Nikkah RSVP",
  description: "With Love, Shaz & Renna",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        pinyonScript.variable,
        charisSil.variable,
        emilysCandy.variable,
        amiri.variable,
        cormorantGaramond.variable,
        tangerine.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
