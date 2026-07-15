"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header style={navbarStyles.header} className="glass-panel">
      <div style={navbarStyles.container} className="container">
        {/* Brand Logo */}
        <div style={navbarStyles.logoContainer} onClick={() => window.location.href = "/"}>
          <Logo width="160px" />
        </div>

        {/* Navigation */}
        <nav style={navbarStyles.nav}>
          <a href="/" style={navbarStyles.navLink}>Catálogo</a>
          <a href="/about" style={navbarStyles.navLink}>Quiénes Somos</a>
          <a href="/contact" style={navbarStyles.navLink}>Contacto</a>
        </nav>

        {/* Cart button */}
        <div style={navbarStyles.actions}>
          <button
            onClick={() => setIsCartOpen(true)}
            style={navbarStyles.cartButton}
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={navbarStyles.badge} className="flex-center animate-fade-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

const navbarStyles = {
  header: {
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
    width: "100%",
    height: "70px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid var(--card-border)",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "var(--primary-light)",
  },
  brandName: {
    fontSize: "1.25rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    "@media (maxWidth: 640px)": {
      display: "none",
    },
  },
  navLink: {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "var(--muted)",
    transition: "color var(--transition-fast)",
    cursor: "pointer",
    ":hover": {
      color: "var(--primary)",
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  cartButton: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid var(--card-border)",
    background: "var(--card)",
    color: "var(--foreground)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  badge: {
    position: "absolute" as const,
    top: "-5px",
    right: "-5px",
    background: "var(--primary)",
    color: "#ffffff",
    fontSize: "0.7rem",
    fontWeight: 700,
    borderRadius: "50%",
    minWidth: "20px",
    height: "20px",
    padding: "0 4px",
  },
};
