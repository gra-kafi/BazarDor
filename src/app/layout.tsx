import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: "বাজার দর (BazarDor) — নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য বাজারদর",
  description:
    "প্রতিদিনের চাল, ডাল, তেল, সবজি ও মাছ-মাংসের নির্ভরযোগ্য ও হালনাগাদ বাজারদর এক নজরে জানুন। বাজার দর মনিটরিং প্ল্যাটফর্ম।",
  keywords: ["বাজার দর", "BazarDor", "নিত্যপ্রয়োজনীয় পণ্য", "চাল", "ডাল", "তেল", "সবজি", "মাছের বাজার দর"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetchCategories();

  return (
    <html lang="bn">
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <ToastProvider />
          <Navbar categories={categories} />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
