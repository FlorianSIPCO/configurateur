import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/context/SessionProviderWrapper";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIPCO Configurateur",
  description: "Configurateur de borne d'affichage disponible à la location",
  metadataBase: new URL('http://localhost:3000'),
    keywords: "Borne, Configurateur, Performance PC, Ordinateur de jeu, SIPCO, Informatique, Vitré, Bretagne, Ile-et-Vilaine, Ile et Vilaine, ",
    robots: "index, follow", // Google
    openGraph: { // Facebook, LinkedIn, Discord
      type: "website",
      title: "SIPCO Configurateur",
      description: "SIPCO Configurateur.",
      url: "http://localhost:3000", // Confirmer URL
      images: [
        {
          url: "/images/logo.jpg", // Image de prévisualisation pour les réseaux sociaux
          width: 1200,
          height: 630,
          alt: "SIPCO Configurateur",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "SIPCO Configurateur",
      description: "SIPCO Configurateur.",
      images: ["/images/logo.jpg"],
    },
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <SessionProviderWrapper>
          <LayoutWrapper>
            <Toaster position="bottom-center" reverseOrder={false} />
            {children}
          </LayoutWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
