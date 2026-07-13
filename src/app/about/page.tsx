"use client";

import React from "react";
import { Leaf, Globe, Award, Heart, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={styles.pageWrapper}>
      {/* Hero Section */}
      <section style={styles.hero} className="animate-fade-in">
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroBadge} className="badge badge-primary">
            Conócenos
          </div>
          <h1 style={styles.heroTitle}>
            Nuestra Misión es la <br />
            <span style={{ color: "var(--primary)" }}>Sostenibilidad</span>
          </h1>
          <p style={styles.heroSubtitle}>
            En Linea Verde, nos dedicamos a ofrecer productos ecológicos y biodegradables de la más alta calidad para ayudarte a reducir tu huella ecológica diaria.
          </p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="container" style={styles.section}>
        <div style={styles.grid}>
          {/* Card: Quiénes Somos */}
          <div style={styles.card} className="card">
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}>
                <Leaf size={24} color="var(--primary)" />
              </div>
              <h2 style={styles.cardTitle}>¿Quiénes Somos?</h2>
            </div>
            <p style={styles.cardText}>
              Somos un equipo apasionado por el medio ambiente. Creemos firmemente que el consumo diario no tiene por qué dañar a nuestro planeta. Por eso, seleccionamos minuciosamente cada material y proveedor para asegurar que nuestros productos de cuidado personal, hogar y cocina sean 100% responsables y biodegradables.
            </p>
            <p style={styles.cardText}>
              Nacimos con el propósito de simplificar la transición hacia un estilo de vida residuo cero (Zero Waste) en toda la comunidad, garantizando funcionalidad, diseño y precios justos.
            </p>
          </div>

          {/* Card: Valores */}
          <div style={styles.card} className="card">
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}>
                <Award size={24} color="var(--primary)" />
              </div>
              <h2 style={styles.cardTitle}>Nuestros Valores</h2>
            </div>
            <div style={styles.valuesList}>
              <div style={styles.valueItem}>
                <ShieldCheck size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Calidad Certificada:</strong> Productos probados y duraderos para un consumo responsable.
                </div>
              </div>
              <div style={styles.valueItem}>
                <Heart size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Pasión por la Naturaleza:</strong> Cada decisión que tomamos busca proteger la biodiversidad.
                </div>
              </div>
              <div style={styles.valueItem}>
                <Globe size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Impacto Global:</strong> Fomentamos prácticas éticas en toda nuestra cadena de valor.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  pageWrapper: {
    paddingBottom: "5rem",
  },
  hero: {
    padding: "6rem 0 4rem 0",
    background: "radial-gradient(circle at 10% 20%, hsla(142, 72%, 43%, 0.08) 0%, transparent 50%), radial-gradient(circle at 90% 80%, hsla(142, 72%, 43%, 0.06) 0%, transparent 50%)",
    textAlign: "center" as const,
  },
  heroContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
    maxWidth: "800px",
  },
  heroBadge: {
    fontSize: "0.8rem",
    padding: "0.35rem 0.85rem",
    marginBottom: "0.5rem",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "var(--foreground)",
  },
  heroSubtitle: {
    fontSize: "1.15rem",
    lineHeight: 1.6,
    color: "var(--muted)",
    maxWidth: "620px",
  },
  section: {
    marginTop: "3rem",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: 800,
    marginBottom: "1.5rem",
    textAlign: "center" as const,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  gridContact: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    alignItems: "stretch",
  },
  card: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
    background: "var(--card)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  iconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "var(--primary-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    margin: 0,
  },
  cardText: {
    fontSize: "0.95rem",
    color: "var(--muted)",
    lineHeight: 1.6,
    margin: 0,
  },
  valuesList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  valueItem: {
    display: "flex",
    gap: "0.75rem",
    fontSize: "0.95rem",
    color: "var(--muted)",
    lineHeight: 1.5,
  },
};
