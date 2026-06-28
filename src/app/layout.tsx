import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import "@/styles/theme.css";
import "@/styles/animations.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LineaVerde | Catálogo y Pedidos Digitales",
  description: "Explora nuestro catálogo, haz tus pedidos en línea y personaliza tus compras directamente por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
