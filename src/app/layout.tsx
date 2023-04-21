import ExoticNavbar from "@/components/ExoticNavbar";
import "./globals.css";
import { METADATA } from "../constants/metadata";

export const metadata = {
  title: METADATA.title,
  description: METADATA.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-cappuccino bg-black">
        <ExoticNavbar />
        {children}
      </body>
    </html>
  );
}
