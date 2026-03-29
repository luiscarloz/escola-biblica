import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Escola Bíblica IIR Brasil",
  description:
    "A primeira etapa da Escola Bíblica IIR Brasil começa em 8 de abril. 12 semanas de estudo presencial da Palavra de Deus.",
  openGraph: {
    title: "Escola Bíblica IIR Brasil",
    description:
      "12 semanas de estudo presencial da Palavra de Deus. Inscreva-se!",
    type: "website",
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
