"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles, AlertCircle } from "lucide-react";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/context/CartContext";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "@/data/products";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filtering products
  const filteredProducts = useMemo(() => {
    return SEED_PRODUCTS.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === "all" || 
        product.category_id === selectedCategory;

      return matchesSearch && matchesCategory && product.is_active;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div style={styles.pageWrapper}>

      {/* Main Content Area */}
      <main style={styles.main}>
        
        {/* Hero Section */}
        <section style={styles.hero} className="animate-fade-in">
          <div className="container" style={styles.heroContainer}>
            <div style={styles.heroBadge} className="badge badge-primary">
              <Sparkles size={12} style={{ marginRight: "0.25rem" }} />
              Catálogo de Venta Directa
            </div>
            <h1 style={styles.heroTitle}>
              Consumo Consciente,<br />Vida Sostenible
            </h1>
            <p style={styles.heroSubtitle}>
              Explora nuestra colección curada de productos para el hogar y cuidado personal. Añade productos al carrito para solicitar un pedido o cotiza diseños personalizados directamente por WhatsApp.
            </p>
          </div>
        </section>

        {/* Catalog Section */}
        <section style={styles.catalogSection} className="container">
          {/* Search and Filters Bar */}
          <div style={styles.filterBar} className="glass-panel">
            {/* Search Input */}
            <div style={styles.searchWrapper}>
              <Search size={18} color="var(--muted)" style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Category Filter Buttons */}
            <div style={styles.categoryFilters}>
              <button
                onClick={() => setSelectedCategory("all")}
                style={{
                  ...styles.filterBtn,
                  backgroundColor: selectedCategory === "all" ? "var(--primary)" : "transparent",
                  color: selectedCategory === "all" ? "#ffffff" : "var(--foreground)",
                  borderColor: selectedCategory === "all" ? "var(--primary)" : "var(--card-border)",
                }}
              >
                Todos
              </button>
              {SEED_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    ...styles.filterBtn,
                    backgroundColor: selectedCategory === category.id ? "var(--primary)" : "transparent",
                    color: selectedCategory === category.id ? "#ffffff" : "var(--foreground)",
                    borderColor: selectedCategory === category.id ? "var(--primary)" : "var(--card-border)",
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid-catalog">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={styles.noResults} className="flex-center animate-fade-in">
              <AlertCircle size={40} color="var(--muted)" style={{ marginBottom: "1rem" }} />
              <h3>No se encontraron productos</h3>
              <p>Prueba ajustando los términos de tu búsqueda o filtros.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                style={styles.resetFiltersBtn}
                className="btn btn-secondary"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloat />

      {/* Modals and Drawers (controlled by CartContext) */}
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
  },
  main: {
    flex: 1,
    paddingBottom: "4rem",
  },
  hero: {
    padding: "5rem 0 3.5rem 0",
    background: "radial-gradient(circle at 10% 20%, hsla(142, 70%, 95%, 0.4) 0%, transparent 50%), radial-gradient(circle at 90% 80%, hsla(142, 70%, 95%, 0.3) 0%, transparent 50%)",
  },
  heroContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    gap: "1rem",
    maxWidth: "800px",
  },
  heroBadge: {
    fontSize: "0.75rem",
    padding: "0.35rem 0.85rem",
    marginBottom: "0.5rem",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "var(--foreground)",
    "@media (maxWidth: 640px)": {
      fontSize: "2.2rem",
    },
  },
  heroSubtitle: {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    color: "var(--muted)",
    maxWidth: "600px",
  },
  catalogSection: {
    marginTop: "1rem",
  },
  filterBar: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    padding: "1.25rem",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
    marginBottom: "2rem",
    "@media (minWidth: 768px)": {
      flexDirection: "row" as const,
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  searchWrapper: {
    position: "relative" as const,
    flex: 1,
    maxWidth: "400px",
  },
  searchIcon: {
    position: "absolute" as const,
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  searchInput: {
    width: "100%",
    padding: "0.75rem 1rem 0.75rem 2.5rem",
    borderRadius: "10px",
    border: "1px solid var(--card-border)",
    background: "var(--background)",
    outline: "none",
    fontSize: "0.9rem",
    transition: "border-color var(--transition-fast)",
    ":focus": {
      borderColor: "var(--primary)",
    },
  },
  categoryFilters: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "0.5rem",
  },
  filterBtn: {
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    border: "1px solid var(--card-border)",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    outline: "none",
  },
  noResults: {
    padding: "4rem 0",
    flexDirection: "column" as const,
    textAlign: "center" as const,
    gap: "0.5rem",
  },
  resetFiltersBtn: {
    marginTop: "1rem",
    padding: "0.5rem 1.25rem",
    fontSize: "0.85rem",
  },
};
