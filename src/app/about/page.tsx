"use client";

import React from "react";
import { 
  Leaf, 
  Sparkles, 
  Eye, 
  Compass, 
  Recycle, 
  Sliders, 
  Wand2, 
  Building2, 
  Store, 
  Gift,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function AboutPage() {
  return (
    <div style={styles.pageWrapper}>
      {/* Hero Section */}
      <section style={styles.hero} className="animate-fade-in">
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroBadge} className="badge badge-primary">
            <Sparkles size={12} style={{ marginRight: "0.25rem" }} />
            Sobre Nosotros
          </div>
          <h1 style={styles.heroTitle}>
            Diseño Alternativo e <br />
            <span style={{ color: "var(--primary)" }}>Impacto Sostenible</span>
          </h1>
          <p style={styles.heroSubtitle}>
            En <strong>Línea Verde</strong>, transformamos el cartón corrugado en arte, funcionalidad y conciencia ambiental. Somos un estudio de diseño que ofrece soluciones innovadoras en el diseño, desarrollo y producción de proyectos y mobiliario.
          </p>

          {/* Respaldado por Empacar S.A. Callout */}
          <div style={styles.parentCallout} className="glass-panel">
            <div style={styles.parentCalloutIcon}>
              <ShieldCheck size={24} color="var(--primary)" />
            </div>
            <div style={styles.parentCalloutText}>
              <strong>Nuestra Familia:</strong> Nacemos en completa armonía y bajo el sólido respaldo de nuestra casa madre, <strong>Empacar S.A.</strong>, lo que garantiza nuestro compromiso inquebrantable con la calidad y los procesos industriales responsables.
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="container" style={styles.section}>
        <div style={styles.gridTwoColumns}>
          {/* Card: Misión */}
          <div style={styles.card} className="card">
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}>
                <Compass size={24} color="var(--primary)" />
              </div>
              <h2 style={styles.cardTitle}>Nuestra Misión</h2>
            </div>
            <p style={styles.cardText}>
              Crear soluciones de diseño personalizadas e innovadoras que transformen los espacios de nuestros clientes, integrando estética, funcionalidad y un proceso creativo que supere toda expectativa.
            </p>
          </div>

          {/* Card: Visión */}
          <div style={styles.card} className="card">
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}>
                <Eye size={24} color="var(--primary)" />
              </div>
              <h2 style={styles.cardTitle}>Nuestra Visión</h2>
            </div>
            <p style={styles.cardText}>
              Liderar el mercado del diseño alternativo y efímero, demostrando que la creatividad no tiene límites y que se pueden generar experiencias inolvidables a través de materiales versátiles y sustentables.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestros Pilares Section */}
      <section className="container" style={styles.sectionWithTopBorder}>
        <div style={styles.sectionHeader}>
          <div style={{ display: "inline-flex", gap: "0.25rem", alignItems: "center" }}>
            <Leaf size={16} color="var(--primary)" />
            <span style={styles.sectionTag}>Lo que nos define</span>
          </div>
          <h2 style={styles.sectionTitle}>Nuestros Pilares Fundamentales</h2>
          <p style={styles.sectionSubtitle}>
            Principios que guían nuestro proceso creativo y nuestro compromiso con el diseño responsable.
          </p>
        </div>

        <div style={styles.gridThreeColumns}>
          {/* Pilar 1: Diseño Sostenible */}
          <div style={styles.pilarCard} className="card">
            <div style={styles.iconContainer}>
              <Recycle size={28} color="var(--primary)" />
            </div>
            <h3 style={styles.pilarTitle}>Diseño Sostenible y Economía Circular</h3>
            <p style={styles.cardText}>
              Todos nuestros productos son 100% reutilizables, reciclables y amigables con el medio ambiente. Reducimos activamente la huella de carbono fomentando la cultura del reciclaje en cada desarrollo.
            </p>
          </div>

          {/* Pilar 2: Personalización Absoluta */}
          <div style={styles.pilarCard} className="card">
            <div style={styles.iconContainer}>
              <Sliders size={28} color="var(--primary)" />
            </div>
            <h3 style={styles.pilarTitle}>Personalización Absoluta</h3>
            <p style={styles.cardText}>
              No creemos en soluciones genéricas. Cada stand, mueble, estructura comercial o souvenir se ajusta de forma precisa a la medida y visión de cada marca o cliente.
            </p>
          </div>

          {/* Pilar 3: El Mago y El Creador */}
          <div style={styles.pilarCard} className="card">
            <div style={styles.iconContainer}>
              <Wand2 size={28} color="var(--primary)" />
            </div>
            <h3 style={styles.pilarTitle}>Personalidad de Marca</h3>
            <p style={styles.cardText}>
              Bajo los arquetipos de <strong>El Mago y El Creador</strong>, nos apasiona innovar, pensar "fuera de la caja" y transformar conceptos abstractos en realidades físicas de alto impacto visual y funcional en tiempos récord.
            </p>
          </div>
        </div>
      </section>

      {/* Líneas de Negocio Section */}
      <section className="container" style={styles.sectionWithTopBorder}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>Líneas de Negocio</span>
          <h2 style={styles.sectionTitle}>Nuestras Soluciones Clave</h2>
          <p style={styles.sectionSubtitle}>
            Diseños versátiles en cartón corrugado adaptados a diferentes necesidades y sectores comerciales.
          </p>
        </div>

        <div style={styles.gridThreeColumns}>
          {/* Línea 1: Stands y Arquitectura Efímera */}
          <div style={styles.businessCard} className="card">
            <div style={styles.businessHeader}>
              <div style={styles.businessIconWrapper}>
                <Building2 size={24} color="var(--primary)" />
              </div>
              <h3 style={styles.businessTitle}>Montaje de Stands y Arquitectura Efímera</h3>
            </div>
            <p style={styles.businessText}>
              Diseño, desarrollo y montaje de estructuras para ferias y eventos comerciales. Espacios efímeros de alto impacto visual que destacan la identidad sostenible de tu marca.
            </p>
            <div style={styles.businessFooter}>
              <span style={styles.businessLink}>Consultar servicio <ArrowRight size={14} /></span>
            </div>
          </div>

          {/* Línea 2: Mobiliario Ecológico */}
          <div style={styles.businessCard} className="card">
            <div style={styles.businessHeader}>
              <div style={styles.businessIconWrapper}>
                <Store size={24} color="var(--primary)" />
              </div>
              <h3 style={styles.businessTitle}>Mobiliario Ecológico de Stock</h3>
            </div>
            <p style={styles.businessText}>
              Muebles funcionales e innovadores para el hogar, oficina y puntos de venta (POS). Alta resistencia, fácil armado y un diseño estético responsable de stock inmediato.
            </p>
            <div style={styles.businessFooter}>
              <span style={styles.businessLink}>Ver catálogo <ArrowRight size={14} /></span>
            </div>
          </div>

          {/* Línea 3: Souvenirs y Merchandising */}
          <div style={styles.businessCard} className="card">
            <div style={styles.businessHeader}>
              <div style={styles.businessIconWrapper}>
                <Gift size={24} color="var(--primary)" />
              </div>
              <h3 style={styles.businessTitle}>Línea Empresarial y Regalos</h3>
            </div>
            <p style={styles.businessText}>
              Souvenirs, merchandising ecológico, empaques corporativos y cortes de formas personalizadas. Detalles con un sello sustentable que marcan la diferencia.
            </p>
            <div style={styles.businessFooter}>
              <span style={styles.businessLink}>Cotizar corporativos <ArrowRight size={14} /></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  pageWrapper: {
    paddingBottom: "6rem",
  },
  hero: {
    padding: "6rem 0 4rem 0",
    background: "radial-gradient(circle at 10% 20%, hsla(142, 72%, 43%, 0.06) 0%, transparent 50%), radial-gradient(circle at 90% 80%, hsla(142, 72%, 43%, 0.04) 0%, transparent 50%)",
    textAlign: "center" as const,
  },
  heroContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1.25rem",
    maxWidth: "850px",
  },
  heroBadge: {
    fontSize: "0.8rem",
    padding: "0.35rem 0.85rem",
    marginBottom: "0.5rem",
  },
  heroTitle: {
    fontSize: "3.2rem",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "var(--foreground)",
    lineHeight: 1.15,
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    lineHeight: 1.6,
    color: "var(--muted)",
    maxWidth: "700px",
    margin: "0 auto",
  },
  parentCallout: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
    padding: "1.25rem 1.75rem",
    borderRadius: "var(--radius-md)",
    maxWidth: "750px",
    textAlign: "left" as const,
    marginTop: "1.5rem",
    border: "1px solid var(--card-border)",
  },
  parentCalloutIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--primary-light)",
    padding: "0.75rem",
    borderRadius: "12px",
    flexShrink: 0,
  },
  parentCalloutText: {
    fontSize: "0.95rem",
    lineHeight: 1.5,
    color: "var(--foreground)",
  },
  section: {
    marginTop: "4rem",
  },
  sectionWithTopBorder: {
    marginTop: "5rem",
    paddingTop: "4rem",
    borderTop: "1px solid var(--border)",
  },
  sectionHeader: {
    textAlign: "center" as const,
    marginBottom: "3rem",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.5rem",
  },
  sectionTag: {
    fontSize: "0.8rem",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    color: "var(--primary)",
  },
  sectionTitle: {
    fontSize: "2.2rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--foreground)",
  },
  sectionSubtitle: {
    fontSize: "1.05rem",
    color: "var(--muted)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  gridTwoColumns: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2.5rem",
  },
  gridThreeColumns: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "2rem",
  },
  card: {
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
    background: "var(--card)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
    boxShadow: "var(--shadow-sm)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  iconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "var(--primary-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    margin: 0,
    color: "var(--foreground)",
  },
  cardText: {
    fontSize: "1rem",
    color: "var(--muted)",
    lineHeight: 1.6,
    margin: 0,
  },
  pilarCard: {
    padding: "2.5rem 2rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    background: "var(--card)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
    boxShadow: "var(--shadow-sm)",
    alignItems: "center",
    textAlign: "center" as const,
  },
  iconContainer: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "var(--primary-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.5rem",
  },
  pilarTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "var(--foreground)",
    margin: 0,
  },
  businessCard: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
    background: "var(--card)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
    boxShadow: "var(--shadow-sm)",
    justifyContent: "space-between",
  },
  businessHeader: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  businessIconWrapper: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "var(--primary-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  businessTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "var(--foreground)",
    lineHeight: 1.3,
  },
  businessText: {
    fontSize: "0.95rem",
    color: "var(--muted)",
    lineHeight: 1.55,
    margin: 0,
    flexGrow: 1,
  },
  businessFooter: {
    borderTop: "1px solid var(--border)",
    paddingTop: "1rem",
    marginTop: "0.5rem",
  },
  businessLink: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--primary)",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    cursor: "pointer",
  },
};
