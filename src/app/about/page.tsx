"use client";

import React from "react";
import { Leaf, MapPin, Phone, Mail, MessageCircle, Globe, Award, Heart, ShieldCheck } from "lucide-react";
import { shopConfig } from "@/config/shop";

export default function AboutPage() {
  const handleWhatsAppRedirect = () => {
    const encodedText = encodeURIComponent("¡Hola! Me gustaría conocer más sobre sus productos sostenibles.");
    const url = `https://wa.me/${shopConfig.whatsappNumber}?text=${encodedText}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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

      {/* Ubicación y Contacto */}
      <section className="container" style={styles.section}>
        <h2 style={styles.sectionTitle}>Ubicación y Contacto</h2>
        <div style={styles.gridContact}>
          {/* Info block */}
          <div style={styles.contactInfo} className="card">
            <div style={styles.infoRow}>
              <MapPin size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={styles.infoTitle}>Dirección Comercial</h4>
                <p style={styles.infoText}>Av. Principal 123, Miraflores, Lima, Perú</p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <Phone size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={styles.infoTitle}>Teléfono / WhatsApp</h4>
                <p style={styles.infoText}>+51 987 654 321</p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <Mail size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={styles.infoTitle}>Correo Electrónico</h4>
                <p style={styles.infoText}>contacto@lineaverde.com</p>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h4 style={styles.infoTitle}>Nuestras Redes Sociales</h4>
              <div style={styles.socialIcons}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialBtn} className="btn-icon flex-center" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialBtn} className="btn-icon flex-center" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a onClick={handleWhatsAppRedirect} style={styles.socialBtn} className="btn-icon flex-center" aria-label="WhatsApp" role="button">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Map Mockup */}
          <div style={styles.mapContainer} className="card">
            <div style={styles.mapHeader}>
              <MapPin size={18} color="var(--primary)" />
              <span>Mapa de Referencia</span>
            </div>
            <div style={styles.mapFramePlaceholder} className="flex-center">
              {/* Modern embedded Google Map placeholder */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3789467775586!2d-77.0315229241031!3d-12.120468988122394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7fe226e6ef3%3A0xe5a36371cb14e210!2sMiraflores!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "0 0 var(--radius-lg) var(--radius-lg)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
  contactInfo: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
    justifyContent: "center",
  },
  infoRow: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  infoTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "var(--foreground)",
    margin: "0 0 0.25rem 0",
  },
  infoText: {
    fontSize: "0.9rem",
    color: "var(--muted)",
    margin: 0,
  },
  socialIcons: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "0.75rem",
  },
  socialBtn: {
    cursor: "pointer",
    transition: "transform var(--transition-fast)",
    ":hover": {
      transform: "scale(1.1)",
    },
  },
  mapContainer: {
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    height: "350px",
  },
  mapHeader: {
    padding: "1rem 1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: 600,
    borderBottom: "1px solid var(--card-border)",
    fontSize: "0.95rem",
  },
  mapFramePlaceholder: {
    flex: 1,
    background: "var(--muted-light)",
  },
};
