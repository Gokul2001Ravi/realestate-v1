import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { brandConfig } from "@/lib/brandConfig";

export const metadata: Metadata = {
  title: `${brandConfig.nameEn} | Premium Land Discovery in Tamil Nadu`,
  description:
    "Curated agricultural lands, farmhouse estates, and prime plots across Tamil Nadu. Drone-inspected, title-checked, and represented with complete transparency.",
  keywords: [
    "Tamil Nadu Land Brokerage",
    "Agricultural land for sale in Tamil Nadu",
    "Pollachi coconut farm",
    "Dindigul farmhouse land",
    "Thanjavur paddy land",
    "Coimbatore commercial plots",
    "Verified Patta Land Tamil Nadu",
  ],
  authors: [{ name: brandConfig.brokerName }],
  openGraph: {
    title: `${brandConfig.nameEn} - Premium Land Discovery`,
    description: brandConfig.descriptionEn,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased bg-ivory-50/40 text-charcoal-900">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
