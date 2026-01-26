import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "sonner";
import "./globals.css";
import MixpanelScript from "@/components/analytics/MixpanelScript";

export const metadata: Metadata = {
  metadataBase: new URL('https://cd2.conan.school'),
  title: {
    default: "Customer Decode | Conan School",
    template: "%s | Conan School"
  },
  description: "Học Customer Decode với framework chuẩn thế giới - Clarity thay vì đoán, Simplicity thay vì phức tạp, Competency thay vì mơ hồ",
  keywords: ["customer decode", "JTBD", "jobs to be done", "marketing", "conan school", "customer insight", "viral content", "personal branding"],
  authors: [{ name: "Conan School", url: "https://conan.school" }],
  creator: "Conan School",
  publisher: "Conan School",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://cd2.conan.school",
    siteName: "Customer Decode",
    title: "Customer Decode | Conan School",
    description: "Học Customer Decode với framework chuẩn thế giới - Clarity thay vì đoán",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Customer Decode by Conan School"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Decode | Conan School",
    description: "Học Customer Decode với framework chuẩn thế giới",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <MixpanelScript />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1, padding: '2rem 0' }}>
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
