"use client";

import React from "react";
import { Leaf, MapPin, Mail, ExternalLink } from "lucide-react";
import { shopConfig } from "@/config/shop";

export default function ContactPage() {
  const mapUrl = "https://www.google.com/maps/place/Empacar+S.A./@-17.7550319,-63.1352005,16.37z/data=!4m6!3m5!1s0x93f1e63d7e0ab44f:0xc90177293f58d579!8m2!3d-17.7550016!4d-63.1324816!16s%2Fg%2F11cn92zgpr?authuser=0&entry=ttu&g_ep=EgoyMDI2MDcxMi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div style={styles.pageWrapper}>
      {/* Hero Section */}
      <section style={styles.hero} className="animate-fade-in">
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroBadge} className="badge badge-primary">
            Contacto
          </div>
          <h1 style={styles.heroTitle}>
            Ponte en Contacto <br />
            <span style={{ color: "var(--primary)" }}>Con Nosotros</span>
          </h1>
          <p style={styles.heroSubtitle}>
            ¿Tienes dudas, sugerencias o buscas una propuesta corporativa personalizada? Escríbenos y nuestro equipo te responderá lo antes posible.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Map */}
      <section className="container" style={styles.section}>
        <div style={styles.mainGrid}>
          {/* Column 1: Contact Info Cards */}
          <div style={styles.infoCol}>
            <h2 style={styles.sectionTitle}>Canales de Atención</h2>
            <p style={styles.sectionDesc}>Comunícate con nosotros por medio de nuestros canales oficiales.</p>

            <div style={styles.infoCardsStack}>
              {/* Email Card */}
              <div style={styles.infoCard} className="card animate-slide-up">
                <div style={styles.cardHeader}>
                  <div style={styles.iconWrapper}>
                    <Mail size={22} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={styles.cardTitle}>Correo Electrónico</h3>
                    <p style={styles.cardSubtitle}>Consultas generales y corporativas</p>
                  </div>
                </div>
                <p style={styles.cardValue}>{shopConfig.notificationEmail}</p>
                <a href={`mailto:${shopConfig.notificationEmail}`} style={styles.cardActionLink}>Enviar un correo →</a>
              </div>

              {/* Address Card */}
              <a 
                href={mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ ...styles.infoCard, textDecoration: "none" }} 
                className="card animate-slide-up"
              >
                <div style={styles.cardHeader}>
                  <div style={styles.iconWrapper}>
                    <MapPin size={22} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={styles.cardTitle}>Dirección Oficina</h3>
                    <p style={styles.cardSubtitle}>Santa Cruz de la Sierra, Bolivia</p>
                  </div>
                </div>
                <p style={styles.cardValue}>Parque Industrial, Calle Transversal 11, PI-45B</p>
                <span style={styles.cardActionLink}>Ver indicaciones en mapa →</span>
              </a>
            </div>

            {/* Social Media */}
            <div style={styles.socialSection} className="card">
              <h3 style={styles.socialTitle}>Conéctate en Redes</h3>
              <div style={styles.socialIcons}>
                <a 
                  href="https://www.instagram.com/lineaverde.bo?igsh=MWJrZXhwc3BhbHExOQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.socialBtn} 
                  className="btn-icon flex-center" 
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/1Gznc9ktQ3/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.socialBtn} 
                  className="btn-icon flex-center" 
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@lineaverde.bo?_r=1&_t=ZS-97zBsqOtB6P" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.socialBtn} 
                  className="btn-icon flex-center" 
                  aria-label="Tiktok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Map */}
          <div style={styles.formCol}>
            {/* Map Card */}
            <div style={styles.mapContainer} className="card">
              <div style={styles.mapHeader}>
                <MapPin size={18} color="var(--primary)" />
                <span style={{ flexGrow: 1 }}>Nuestra Ubicación</span>
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={styles.externalLink} aria-label="Abrir en Google Maps">
                  <ExternalLink size={16} />
                </a>
              </div>
              <div style={styles.mapFramePlaceholder}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.3093259976375!2d-63.1346682240176!3d-17.75500158785934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e63d7e0ab44f%3A0xc90177293f58d579!2sEmpacar%20S.A.!5e0!3m2!1ses-419!2sbo!4v1710000000000!5m2!1ses-419!2sbo"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px", flexGrow: 1 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
    marginTop: "2rem",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "3rem",
    alignItems: "stretch",
  },
  infoCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    margin: 0,
  },
  sectionDesc: {
    fontSize: "1rem",
    color: "var(--muted)",
    lineHeight: 1.5,
    margin: 0,
  },
  infoCardsStack: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
    marginTop: "0.5rem",
  },
  infoCard: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
    background: "var(--card)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
    transition: "transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  iconWrapper: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "var(--primary-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    margin: 0,
  },
  cardSubtitle: {
    fontSize: "0.8rem",
    color: "var(--muted)",
    margin: 0,
  },
  cardValue: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "var(--foreground)",
    margin: "0.25rem 0 0 0",
  },
  cardActionLink: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "var(--primary)",
    alignSelf: "flex-start",
  },
  socialSection: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    background: "var(--card)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
  },
  socialTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    margin: 0,
  },
  socialIcons: {
    display: "flex",
    gap: "0.75rem",
  },
  socialBtn: {
    cursor: "pointer",
    transition: "transform var(--transition-fast)",
    ":hover": {
      transform: "scale(1.1)",
    },
  },
  formCol: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
  },
  mapContainer: {
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    height: "100%",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
    boxShadow: "var(--shadow-sm)",
  },
  mapHeader: {
    padding: "1rem 1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: 600,
    borderBottom: "1px solid var(--card-border)",
    fontSize: "0.95rem",
    background: "var(--card)",
  },
  externalLink: {
    color: "var(--muted)",
    display: "flex",
    alignItems: "center",
    transition: "color var(--transition-fast)",
    ":hover": {
      color: "var(--primary)",
    },
  },
  mapFramePlaceholder: {
    flex: 1,
    background: "var(--muted-light)",
    display: "flex",
    flexDirection: "column" as const,
  },
};
