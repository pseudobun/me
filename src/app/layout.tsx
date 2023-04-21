import "./globals.css";
import { METADATA } from "../constants/metadata";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";

export const metadata = METADATA.root;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-cappuccino bg-gradient-to-tr from-black to-gray-800">
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
