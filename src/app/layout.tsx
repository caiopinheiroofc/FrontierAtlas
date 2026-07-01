import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontier Atlas",
  description: "Sua rota inteligente de compras em Ciudad del Este.",
  icons: {
    icon: "/frontier-atlas-symbol.png",
    shortcut: "/frontier-atlas-symbol.png",
    apple: "/frontier-atlas-symbol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
