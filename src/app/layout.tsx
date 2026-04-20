import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatFab from "@/components/layout/ChatFab";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cupffee — The World's First Edible Cup",
  description:
    "Cupffee is the world's first edible cup that gives you a delicious and crunchy experience while caring for the planet. Tasty as a cookie, green as the Earth.",
  keywords: "edible cup, sustainable, eco-friendly, coffee cup, vegan",
  openGraph: {
    title: "Cupffee — The World's First Edible Cup",
    description: "Tasty as a cookie. Green as the planet.",
    images: ["/logo-cupffee-without-bg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.className} bg-white text-[#3d1a08] antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-20 lg:pt-[5.5rem]">{children}</main>
        <Footer />
        <ChatFab />
      </body>
    </html>
  );
}
