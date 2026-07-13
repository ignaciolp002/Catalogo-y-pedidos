"use client";

import React, { useState } from "react";
import { Leaf, MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { shopConfig } from "@/config/shop";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    // Simulate API request
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleWhatsAppRedirect = () => {
    const encodedText = encodeURIComponent(shopConfig.whatsappMessages.generalContact);
    const url = `https://wa.me/${shopConfig.whatsappNumber}?text=${encodedText}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
            ¿Tienes dudas, sugerencias o buscas un diseño personalizado? Escríbenos y nuestro equipo consciente te responderá lo antes posible.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="container" style={styles.section}>
        <div style={styles.mainGrid}>
          {/* Column 1: Contact Info Cards */}
          <div style={styles.infoCol}>
            <h2 style={styles.sectionTitle}>Canales de Atención</h2>
            <p style={styles.sectionDesc}>Elige el medio de tu preferencia para comunicarte con nosotros de manera rápida.</p>

            <div style={styles.infoCardsStack}>
              {/* WhatsApp Card */}
              <div 
                style={{ ...styles.infoCard, borderColor: "var(--primary)" }} 
                className="card animate-slide-up"
                onClick={handleWhatsAppRedirect}
              >
                <div style={styles.cardHeader}>
                  <div style={{ ...styles.iconWrapper, background: "var(--primary-light)" }}>
                    <MessageCircle size={22} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={styles.cardTitle}>WhatsApp Directo</h3>
                    <p style={styles.cardSubtitle}>Atención inmediata y cotizaciones</p>
                  </div>
                </div>
                <p style={styles.cardValue}>+51 987 654 321</p>
                <span style={styles.cardActionLink}>Chatear ahora →</span>
              </div>

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
                <span style={styles.cardActionLink}>Enviar un correo →</span>
              </div>

              {/* Address Card */}
              <div style={styles.infoCard} className="card animate-slide-up">
                <div style={styles.cardHeader}>
                  <div style={styles.iconWrapper}>
                    <MapPin size={22} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={styles.cardTitle}>Dirección Oficina</h3>
                    <p style={styles.cardSubtitle}>Visítanos bajo previa coordinación</p>
                  </div>
                </div>
                <p style={styles.cardValue}>Av. Principal 123, Miraflores, Lima, Perú</p>
              </div>
            </div>

            {/* Social Media */}
            <div style={styles.socialSection} className="card">
              <h3 style={styles.socialTitle}>Conéctate en Redes</h3>
              <div style={styles.socialIcons}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialBtn} className="btn-icon flex-center" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialBtn} className="btn-icon flex-center" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Form & Map */}
          <div style={styles.formCol}>
            {/* Contact Form */}
            <div style={styles.formContainer} className="card glass-panel">
              {formStatus === "success" ? (
                <div style={styles.successState} className="animate-fade-in">
                  <CheckCircle2 size={60} color="var(--success)" style={{ marginBottom: "1rem" }} />
                  <h3 style={styles.successTitle}>¡Mensaje Enviado!</h3>
                  <p style={styles.successText}>
                    Gracias por ponerte en contacto. Hemos recibido tu mensaje y uno de nuestros asesores ambientales te responderá al correo provisto muy pronto.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")} 
                    style={styles.resetBtn}
                    className="btn btn-primary"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={styles.form}>
                  <h3 style={styles.formTitle}>Envíanos un Mensaje</h3>
                  <p style={styles.formSubtitle}>Te responderemos en un plazo máximo de 24 horas hábiles.</p>
                  
                  {formStatus === "error" && (
                    <div style={styles.errorAlert} className="animate-fade-in">
                      <AlertCircle size={18} style={{ marginRight: "0.5rem" }} />
                      <span>Por favor completa todos los campos requeridos (*).</span>
                    </div>
                  )}

                  <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Nombre Completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej. Sofía Pérez"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Correo Electrónico *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej. sofia@ejemplo.com"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="subject" style={styles.label}>Asunto (Opcional)</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Ej. Consulta sobre stock / pedido personalizado"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="message" style={styles.label}>Mensaje *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Escribe tu duda o consulta aquí..."
                      style={styles.textarea}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === "submitting"}
                    style={styles.submitBtn}
                    className="btn btn-primary"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <div style={styles.spinner} className="animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map Card */}
            <div style={styles.mapContainer} className="card">
              <div style={styles.mapHeader}>
                <MapPin size={18} color="var(--primary)" />
                <span>Nuestra Ubicación (Mapa de Referencia)</span>
              </div>
              <div style={styles.mapFramePlaceholder}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3789467775586!2d-77.0315229241031!3d-12.120468988122394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7fe226e6ef3%3A0xe5a36371cb14e210!2sMiraflores!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "250px" }}
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
    alignItems: "start",
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
    cursor: "pointer",
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
    background: "var(--muted-light)",
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
    gap: "2rem",
  },
  formContainer: {
    padding: "2.5rem",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: 800,
    margin: 0,
  },
  formSubtitle: {
    fontSize: "0.9rem",
    color: "var(--muted)",
    margin: "0 0 0.5rem 0",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--foreground)",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--card-border)",
    background: "var(--background)",
    outline: "none",
    fontSize: "0.9rem",
    transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
    width: "100%",
    ":focus": {
      borderColor: "var(--primary)",
      boxShadow: "0 0 0 3px var(--primary-glow)",
    },
  },
  textarea: {
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--card-border)",
    background: "var(--background)",
    outline: "none",
    fontSize: "0.9rem",
    transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
    width: "100%",
    resize: "vertical" as const,
    ":focus": {
      borderColor: "var(--primary)",
      boxShadow: "0 0 0 3px var(--primary-glow)",
    },
  },
  errorAlert: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    background: "rgba(239, 68, 68, 0.1)",
    color: "var(--danger)",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  submitBtn: {
    marginTop: "0.5rem",
    padding: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontSize: "0.95rem",
  },
  successState: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    padding: "2rem 0",
  },
  successTitle: {
    fontSize: "1.6rem",
    fontWeight: 800,
    margin: "0 0 0.5rem 0",
  },
  successText: {
    fontSize: "0.95rem",
    color: "var(--muted)",
    lineHeight: 1.6,
    maxWidth: "400px",
    margin: "0 0 2rem 0",
  },
  resetBtn: {
    padding: "0.75rem 2rem",
  },
  spinner: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "#ffffff",
  },
  mapContainer: {
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
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
    display: "flex",
    flexDirection: "column" as const,
  },
};
