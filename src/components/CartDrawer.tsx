"use client";

import React, { useEffect } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { shopConfig } from "@/config/shop";

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal,
    setIsCheckoutOpen
  } = useCart();

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div style={styles.overlay} onClick={() => setIsCartOpen(false)}>
      {/* Sliding Panel */}
      <div 
        style={styles.drawer} 
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-in-right"
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h2 style={styles.title}>Tu Carrito</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={styles.closeBtn}
            className="flex-center"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {cart.length === 0 ? (
            <div style={styles.emptyState} className="flex-center">
              <ShoppingBag size={48} color="var(--card-border)" style={{ marginBottom: "1rem" }} />
              <p style={styles.emptyText}>Tu carrito está vacío</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={styles.continueShopping}
                className="btn btn-secondary"
              >
                Volver al Catálogo
              </button>
            </div>
          ) : (
            <div style={styles.itemsList}>
              {cart.map((item) => (
                <div key={item.product.id} style={styles.cartItem}>
                  {/* Product Image */}
                  <div style={styles.itemImageContainer}>
                    {item.product.image_url ? (
                      <img 
                        src={item.product.image_url} 
                        alt={item.product.name} 
                        style={styles.itemImage}
                      />
                    ) : (
                      <div style={styles.itemImagePlaceholder} className="flex-center">
                        <ShoppingBag size={16} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemName}>{item.product.name}</h4>
                    <p style={styles.itemPrice}>
                      {shopConfig.currencySymbol}{item.product.price.toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div style={styles.itemControls}>
                      <div style={styles.quantityPicker}>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={styles.quantityBtn}
                          className="flex-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={styles.quantityValue}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={styles.quantityBtn}
                          className="flex-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        style={styles.removeBtn}
                        className="flex-center"
                        title="Eliminar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Subtotal:</span>
              <span style={styles.summaryValue}>
                {shopConfig.currencySymbol}{cartTotal.toFixed(2)}
              </span>
            </div>
            
            <p style={styles.footerNote}>
              Los detalles de envío y métodos de pago se coordinan al finalizar el pedido.
            </p>

            <button 
              onClick={handleCheckoutClick}
              style={styles.checkoutBtn}
              className="btn btn-primary"
            >
              Completar Pedido
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    zIndex: 999,
    display: "flex",
    justifyContent: "flex-end",
    animation: "fadeIn var(--transition-fast) forwards",
  },
  drawer: {
    width: "100%",
    maxWidth: "420px",
    height: "100%",
    backgroundColor: "var(--card)",
    borderLeft: "1px solid var(--card-border)",
    display: "flex",
    flexDirection: "column" as const,
    boxShadow: "var(--shadow-lg)",
    animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
  },
  header: {
    padding: "1.25rem 1.5rem",
    borderBottom: "1px solid var(--card-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: 700,
    margin: 0,
  },
  closeBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "var(--muted-light)",
    border: "none",
    cursor: "pointer",
    color: "var(--foreground)",
    transition: "background var(--transition-fast)",
  },
  content: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "1.5rem",
  },
  emptyState: {
    height: "100%",
    flexDirection: "column" as const,
    textAlign: "center" as const,
  },
  emptyText: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "var(--muted)",
    marginBottom: "1.5rem",
  },
  continueShopping: {
    fontSize: "0.9rem",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
  },
  cartItem: {
    display: "flex",
    gap: "1rem",
    paddingBottom: "1.25rem",
    borderBottom: "1px solid var(--card-border)",
  },
  itemImageContainer: {
    width: "70px",
    height: "70px",
    borderRadius: "8px",
    overflow: "hidden",
    background: "var(--muted-light)",
    flexShrink: 0,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  itemImagePlaceholder: {
    width: "100%",
    height: "100%",
    color: "var(--muted)",
  },
  itemInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.25rem",
  },
  itemName: {
    fontSize: "0.95rem",
    fontWeight: 600,
    margin: 0,
    display: "-webkit-box" as const,
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  },
  itemPrice: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "var(--primary)",
  },
  itemControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  quantityPicker: {
    display: "flex",
    alignItems: "center",
    border: "1px solid var(--card-border)",
    borderRadius: "8px",
    background: "var(--muted-light)",
    padding: "2px",
  },
  quantityBtn: {
    width: "24px",
    height: "24px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "var(--foreground)",
  },
  quantityValue: {
    fontSize: "0.85rem",
    fontWeight: 600,
    minWidth: "24px",
    textAlign: "center" as const,
  },
  removeBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--danger)",
    transition: "background var(--transition-fast)",
  },
  footer: {
    padding: "1.5rem",
    borderTop: "1px solid var(--card-border)",
    background: "var(--muted-light)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontWeight: 600,
    color: "var(--muted)",
  },
  summaryValue: {
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "var(--foreground)",
  },
  footerNote: {
    fontSize: "0.75rem",
    color: "var(--muted)",
    textAlign: "center" as const,
    margin: 0,
  },
  checkoutBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontSize: "1rem",
    padding: "0.9rem",
  }
};
