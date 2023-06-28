import "./globals.css";
import { METADATA } from "../constants/metadata";
import Header from "@/components/Header";
import { Analytics } from '@vercel/analytics/react';
// import Footer from "@/components/Footer";

export const metadata = METADATA.root;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full text-cappuccino bg-fixed bg-gradient-to-tr from-black to-gray-800">
        <div className="font-ubuntu font-bold sm:py-12 sm:px-6 py-6 px-4 top-0">
          <Header />
        </div>
        {children}
        {/* <Footer /> */}
        <Analytics />
      </body>
    </html>
  );
}
