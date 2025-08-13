import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const agency = localFont({
  src: "./fonts/Agency.ttf",
  display: "swap",
  variable: "--font-agency",
});

const chronicle = localFont({
  src: [
    {
      path: "./fonts/Chronicle/ChronicleSemibold.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Chronicle/ChronicleBlack.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Chronicle/ChronicleLightItalic.otf",
      weight: "300",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-chronicle",
});

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${agency.variable} ${chronicle.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
