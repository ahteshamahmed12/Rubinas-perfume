import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Topheader from "./Components/Topheader";
import Headers from "./Components/Headers";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";


const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rubinafragrance.com"),
  title: "Rubina's Fragrance",
  description:
    "Your destination for premium fragrances authentic, curated and unforgettable. Shop with confidence. Small extraordinary!",
  keywords: [
    "perfume",
    "fragrance",
    "Rubinas",
    "buy perfume online",
    "luxury scent",
  ],
  icons: {
    icon: "/icon.ico",
  },
  openGraph: {
    title: "Rubina's Fragrance",
    description: "Premium perfumes for every mood. Shop now.",
    url: "https://rubinafragrance.com",
    images: [
      {
        url: "/pic1.png",
        width: 1200,
        height: 630,
        alt: "Rubina's Fragrance Banner",
      },
    ],
  },
  verification:{
    google:"l6Cj43ZKbu3Dyfv8___G9wbUsHnGFkiYJa-OdEFRBnI"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <Topheader />
        <Headers />
       
        {children}
        <Toaster position="top-center" reverseOrder={false} />
        
        <Footer />
        
      </body>
    </html>
  );
}
