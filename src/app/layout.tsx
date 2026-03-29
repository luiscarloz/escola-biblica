import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Escola Bíblica IIR Brasil — Inscrição Gratuita",
  description:
    "12 semanas de estudo presencial da Palavra de Deus na IIR Brasil. De 8 de abril a 24 de junho, quartas-feiras das 19h30 às 21h30. Inscrição gratuita.",
  keywords: [
    "escola bíblica",
    "IIR Brasil",
    "estudo bíblico",
    "igreja",
    "curso bíblico gratuito",
    "estudo da palavra",
  ],
  authors: [{ name: "IIR Brasil" }],
  openGraph: {
    title: "Escola Bíblica IIR Brasil",
    description:
      "12 semanas de estudo presencial da Palavra de Deus. Inscrição gratuita!",
    type: "website",
    locale: "pt_BR",
    siteName: "Escola Bíblica IIR Brasil",
  },
  twitter: {
    card: "summary_large_image",
    title: "Escola Bíblica IIR Brasil",
    description:
      "12 semanas de estudo presencial da Palavra de Deus. Inscrição gratuita!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
