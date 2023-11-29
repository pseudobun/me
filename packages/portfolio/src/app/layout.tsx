import "./globals.css";
import { METADATA } from "../constants/metadata";
import Navigation from "../components/Navigation";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
// import Footer from "@/components/Footer";

export const metadata = METADATA.root;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="font-cabin text-cappuccino flex h-screen w-full flex-col bg-gradient-to-tr from-black to-gray-800 bg-fixed p-6">
            <Navigation />
            {children}
            {/* <Footer /> */}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
