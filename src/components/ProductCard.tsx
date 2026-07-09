"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart, Product } from "@/context/CartContext";
import { shopConfig } from "@/config/shop";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="card animate-slide-up">
      <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {/* Product Image */}
        <div style={styles.imageContainer}>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              style={styles.image}
              loading="lazy"
            />
          ) : (
            <div style={styles.placeholderImage} className="flex-center">
              <span>Sin imagen</span>
            </div>
          )}
          
          {/* Badges */}
          {product.is_customizable && (
            <span 
              style={{ ...styles.badge, background: "var(--primary-light)", color: "var(--primary)" }}
            >
              Personalizable
            </span>
          )}
        </div>

        {/* Product Details */}
        <div style={{ ...styles.details, paddingBottom: 0 }}>
          <h3 style={styles.title}>{product.name}</h3>
          <p style={styles.description}>{product.description}</p>
        </div>
      </Link>

      <div style={{ ...styles.details, paddingTop: 0 }}>
        {/* Price & Action */}
        <div style={styles.footer}>
          <span style={styles.price}>
            {shopConfig.currencySymbol}{product.price.toFixed(2)}
          </span>

          <button
            onClick={() => addToCart(product)}
            style={styles.actionBtn}
            className="btn btn-primary"
            title="Añadir al carrito"
          >
            <ShoppingCart size={16} />
            <span style={styles.btnText}>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}


const styles = {
  imageContainer: {
    position: "relative" as const,
    width: "100%",
    height: "200px",
    overflow: "hidden",
    background: "var(--muted-light)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "transform var(--transition-normal)",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    color: "var(--muted)",
    fontSize: "0.9rem",
  },
  badge: {
    position: "absolute" as const,
    top: "12px",
    right: "12px",
    padding: "0.25rem 0.6rem",
    borderRadius: "20px",
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  details: {
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
    flex: 1,
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: 700,
    margin: 0,
  },
  description: {
    fontSize: "0.85rem",
    color: "var(--muted)",
    lineHeight: 1.4,
    flex: 1,
    display: "-webkit-box" as const,
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.75rem",
    paddingTop: "0.75rem",
    borderTop: "1px solid var(--card-border)",
  },
  price: {
    fontSize: "1.25rem",
    fontWeight: 800,
    color: "var(--foreground)",
  },
  actionBtn: {
    padding: "0.5rem 0.85rem",
    fontSize: "0.85rem",
    borderRadius: "10px",
    gap: "0.4rem",
  },
  btnText: {
    fontWeight: 600,
  }
};
