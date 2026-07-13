"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Sparkles, AlertCircle } from "lucide-react";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/context/CartContext";
import { Category, SEED_CATEGORIES, SEED_PRODUCTS } from "@/data/products";
import { supabase } from "@/lib/supabase";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setDbError(null);

        // Fetch categories from Supabase
        const { data: catData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("name");

        // Fetch active products from Supabase
        const { data: prodData, error: prodError } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (catError || prodError) {
          throw new Error(catError?.message || prodError?.message || "Error al conectar con la base de datos.");
        }

        if (catData && catData.length > 0) {
          setCategories(catData);
          setProducts(prodData || []);
        } else {
          // If the database tables are empty, load seed data
          setCategories(SEED_CATEGORIES);
          setProducts(SEED_PRODUCTS);
        }
      } catch (err: any) {
        console.warn("Error loading data from Supabase, using local fallback seed data:", err);
        setCategories(SEED_CATEGORIES);
        setProducts(SEED_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === "all" || 
        product.category_id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);


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
              {categories.map((category) => (
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
          {isLoading ? (
            <div style={styles.loadingContainer} className="flex-center animate-fade-in">
              <div style={styles.spinner} className="animate-spin"></div>
              <p style={{ marginTop: "1.5rem", color: "var(--muted)", fontWeight: 500 }}>Cargando catálogo consciente...</p>
            </div>
          ) : dbError ? (
            <div style={styles.noResults} className="flex-center animate-fade-in">
              <AlertCircle size={40} color="var(--danger)" style={{ marginBottom: "1rem" }} />
              <h3>Error de conexión</h3>
              <p>{dbError}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
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
  loadingContainer: {
    padding: "6rem 0",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "3px solid var(--card-border)",
    borderTopColor: "var(--primary)",
  },
};
