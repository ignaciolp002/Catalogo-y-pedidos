"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, MessageSquare, Shield, Truck, RotateCcw, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SEED_PRODUCTS } from "@/data/products";
import { shopConfig } from "@/config/shop";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const product = SEED_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={styles.errorContainer} className="container animate-fade-in">
        <h2 style={styles.errorTitle}>Producto no encontrado</h2>
        <p style={styles.errorText}>Lo sentimos, el producto solicitado no existe o no está disponible actualmente.</p>
        <Link href="/" className="btn btn-primary">
          <ArrowLeft size={18} /> Volver al Catálogo
        </Link>
      </div>
    );
  }

  const handleWhatsAppInquiry = () => {
    const message = shopConfig.whatsappMessages.productQuery(product.name);
    const url = `https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={styles.pageWrapper} className="container animate-fade-in">
      {/* Back Button */}
      <div style={styles.backButtonContainer}>
        <Link href="/" style={styles.backLink} className="flex-center">
          <ArrowLeft size={18} />
          <span>Volver al Catálogo</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div style={styles.grid}>
        {/* Left Column: Image */}
        <div style={styles.imageCol}>
          <div style={styles.imageWrapper} className="card">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                style={styles.image}
              />
            ) : (
              <div style={styles.placeholderImage} className="flex-center">
                <span>Sin imagen disponible</span>
              </div>
            )}
            {product.is_customizable && (
              <span style={styles.badge} className="badge badge-primary">
                Personalizable
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Info */}
        <div style={styles.infoCol}>
          <div style={styles.detailsHeader}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="badge">
                {product.category_id === "c1b9b6be-d8a4-473d-8ab1-19d264feee60" ? "Cuidado Personal" : 
                 product.category_id === "c2b9b6be-d8a4-473d-8ab1-19d264feee61" ? "Hogar y Cocina" : "Accesorios"}
              </span>
            </div>
            <h1 style={styles.title}>{product.name}</h1>
            <p style={styles.price}>
              {shopConfig.currencySymbol}{product.price.toFixed(2)}
            </p>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.descriptionSection}>
            <h3 style={styles.sectionTitle}>Descripción</h3>
            <p style={styles.descriptionText}>{product.description}</p>
          </div>

          {/* Special highlights */}
          <div style={styles.highlightsContainer}>
            <div style={styles.highlightRow}>
              <Check size={16} color="var(--primary)" />
              <span>Materiales ecológicos y biodegradables</span>
            </div>
            <div style={styles.highlightRow}>
              <Check size={16} color="var(--primary)" />
              <span>Envío 100% libre de plásticos</span>
            </div>
            {product.is_customizable && (
              <div style={styles.highlightRow}>
                <Check size={16} color="var(--primary)" />
                <span>Personalización disponible bajo pedido</span>
              </div>
            )}
          </div>

          <div style={styles.divider}></div>

          {/* Action buttons */}
          <div style={styles.actionContainer}>
            {product.is_customizable ? (
              <div style={styles.customActionBox}>
                <p style={styles.customNotice}>
                  Este producto se puede personalizar con tu logo, nombre o diseño preferido. Haz clic en el botón para coordinar por WhatsApp.
                </p>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="btn btn-whatsapp"
                  style={styles.actionBtn}
                >
                  <MessageSquare size={18} />
                  Personalizar por WhatsApp
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="btn btn-primary"
                style={styles.actionBtn}
              >
                <ShoppingCart size={18} />
                Agregar al Carrito
              </button>
            )}
          </div>

          {/* Features cards */}
          <div style={styles.featuresRow}>
            <div style={styles.featureCard} className="glass-panel">
              <Shield size={20} color="var(--primary)" />
              <div style={styles.featureTextWrapper}>
                <h5 style={styles.featureTitle}>Compra Segura</h5>
                <p style={styles.featureDesc}>Pago y entrega garantizada</p>
              </div>
            </div>
            <div style={styles.featureCard} className="glass-panel">
              <Truck size={20} color="var(--primary)" />
              <div style={styles.featureTextWrapper}>
                <h5 style={styles.featureTitle}>Envío Rápido</h5>
                <p style={styles.featureDesc}>Coordinado a tu dirección</p>
              </div>
            </div>
            <div style={styles.featureCard} className="glass-panel">
              <RotateCcw size={20} color="var(--primary)" />
              <div style={styles.featureTextWrapper}>
                <h5 style={styles.featureTitle}>Soporte 24/7</h5>
                <p style={styles.featureDesc}>Atención directa vía chat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    paddingTop: "2rem",
    paddingBottom: "5rem",
  },
  backButtonContainer: {
    marginBottom: "2rem",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--muted)",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "color var(--transition-fast)",
    ":hover": {
      color: "var(--primary)",
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "3rem",
    alignItems: "start",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  imageCol: {
    width: "100%",
  },
  imageWrapper: {
    position: "relative" as const,
    width: "100%",
    aspectRatio: "1/1",
    overflow: "hidden",
    background: "var(--muted-light)",
    borderRadius: "var(--radius-lg)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    color: "var(--muted)",
    fontSize: "1.1rem",
  },
  badge: {
    position: "absolute" as const,
    top: "1.5rem",
    left: "1.5rem",
    fontSize: "0.8rem",
    padding: "0.4rem 0.8rem",
  },
  infoCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  detailsHeader: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: 0,
  },
  price: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "var(--primary)",
    margin: 0,
  },
  divider: {
    height: "1px",
    background: "var(--card-border)",
    width: "100%",
  },
  descriptionSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "var(--foreground)",
    margin: 0,
  },
  descriptionText: {
    fontSize: "1rem",
    color: "var(--muted)",
    lineHeight: 1.6,
    margin: 0,
  },
  highlightsContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.6rem",
    background: "var(--muted-light)",
    padding: "1.25rem",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--card-border)",
  },
  highlightRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.9rem",
    color: "var(--foreground)",
    fontWeight: 500,
  },
  actionContainer: {
    marginTop: "0.5rem",
  },
  actionBtn: {
    width: "100%",
    padding: "1rem",
    fontSize: "1.05rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
  },
  customActionBox: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  customNotice: {
    fontSize: "0.85rem",
    color: "var(--muted)",
    lineHeight: 1.5,
    margin: 0,
  },
  featuresRow: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
    marginTop: "1rem",
    "@media (min-width: 576px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  featureCard: {
    padding: "1rem",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  featureTextWrapper: {
    display: "flex",
    flexDirection: "column" as const,
  },
  featureTitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    margin: 0,
  },
  featureDesc: {
    fontSize: "0.75rem",
    color: "var(--muted)",
    margin: 0,
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    textAlign: "center" as const,
    gap: "1.5rem",
  },
  errorTitle: {
    fontSize: "2rem",
    fontWeight: 800,
  },
  errorText: {
    fontSize: "1.1rem",
    color: "var(--muted)",
    maxWidth: "500px",
  },
};
