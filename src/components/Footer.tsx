import React from "react";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={footerStyles.footer}>
      <div className="container" style={footerStyles.container}>
        <div style={footerStyles.grid}>
          {/* Brand Info */}
          <div style={footerStyles.brandCol}>
            <div style={footerStyles.logo}>
              <Leaf size={20} color="var(--primary)" />
              <span style={footerStyles.brandName}>Linea<span style={{ color: "var(--primary)" }}>Verde</span></span>
            </div>
            <p style={footerStyles.brandText}>
              Ofrecemos productos sostenibles, biodegradables y de alta calidad para el cuidado personal y el hogar. Compra consciente, vive verde.
            </p>
          </div>

          {/* Quick Links */}
          <div style={footerStyles.col}>
            <h4 style={footerStyles.title}>Catálogo</h4>
            <ul style={footerStyles.list}>
              <li><a href="/" style={footerStyles.link}>Todos los Productos</a></li>
              <li><a href="/" style={footerStyles.link}>Cuidado Personal</a></li>
              <li><a href="/" style={footerStyles.link}>Hogar y Cocina</a></li>
              <li><a href="/" style={footerStyles.link}>Accesorios</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div style={footerStyles.col}>
            <h4 style={footerStyles.title}>Contacto y Soporte</h4>
            <ul style={footerStyles.list}>
              <li style={footerStyles.contactItem}>
                <Phone size={16} color="var(--primary)" />
                <span style={footerStyles.contactText}>+51 987 654 321</span>
              </li>
              <li style={footerStyles.contactItem}>
                <Mail size={16} color="var(--primary)" />
                <span style={footerStyles.contactText}>contacto@lineaverde.com</span>
              </li>
              <li style={footerStyles.contactItem}>
                <MapPin size={16} color="var(--primary)" />
                <span style={footerStyles.contactText}>Av. Principal 123, Miraflores</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={footerStyles.bottom}>
          <p style={footerStyles.copyright}>
            © {new Date().getFullYear()} LineaVerde. Todos los derechos reservados. Diseñado para coordinar compras eficientes en línea.
          </p>
        </div>
      </div>
    </footer>
  );
}

const footerStyles = {
  footer: {
    background: "var(--card)",
    borderTop: "1px solid var(--card-border)",
    padding: "4rem 0 2rem 0",
    marginTop: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "3rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2.5rem",
  },
  brandCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    maxWidth: "350px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  brandName: {
    fontSize: "1.2rem",
    fontWeight: 800,
  },
  brandText: {
    fontSize: "0.9rem",
    color: "var(--muted)",
    lineHeight: 1.6,
  },
  col: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.2rem",
  },
  title: {
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.02em",
  },
  list: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
    padding: 0,
    margin: 0,
  },
  link: {
    fontSize: "0.9rem",
    color: "var(--muted)",
    transition: "color var(--transition-fast)",
    cursor: "pointer",
    ":hover": {
      color: "var(--primary)",
    },
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  contactText: {
    fontSize: "0.9rem",
    color: "var(--muted)",
  },
  bottom: {
    borderTop: "1px solid var(--card-border)",
    paddingTop: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  copyright: {
    fontSize: "0.85rem",
    color: "var(--muted)",
    textAlign: "center" as const,
  },
};
