import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cupffee — The World's First Edible Cup",
  description:
    "Cupffee is the world's first edible cup that gives you a delicious and crunchy experience while caring for the planet. Tasty as a cookie, green as the Earth.",
  keywords: "edible cup, sustainable, eco-friendly, coffee cup, vegan",
  openGraph: {
    title: "Cupffee — The World's First Edible Cup",
    description: "Tasty as a cookie. Green as the planet.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f6ece0] text-[#3d1a08] antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
