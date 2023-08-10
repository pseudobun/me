import "./globals.css";
import { METADATA } from "../constants/metadata";
import Navigation from "../components/Navigation";
import { Analytics } from "@vercel/analytics/react";
// import Footer from "@/components/Footer";

export const metadata = METADATA.root;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-tr from-black to-gray-800 bg-fixed font-cabin text-cappuccino">
        <main className="flex h-screen w-full flex-col p-6">
          <Navigation />
          {children}
          {/* <Footer /> */}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
