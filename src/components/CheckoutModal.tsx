"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, MessageSquare, Loader2, AlertCircle, Download } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { shopConfig } from "@/config/shop";
import { supabase } from "@/lib/supabase";
import { jsPDF } from "jspdf";

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartTotal,
    clearCart
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle"); // reset status when opened
      setErrorMessage("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // Generar el UUID en el cliente para evitar requerir permisos de SELECT públicos en RLS
      const orderId = crypto.randomUUID();

      // 1. Insert the order into Supabase
      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          id: orderId,
          customer_name: formData.name,
          customer_email: formData.email || null,
          customer_phone: formData.phone,
          customer_address: formData.address,
          total_price: cartTotal,
          status: "pending",
        });

      if (orderError) throw orderError;

      // 2. Insert each cart item into order_items
      const orderItems = cart.map((item) => ({
        order_id: orderId,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Show short reference of the UUID for display
      setCreatedOrderId(orderId.substring(0, 8).toUpperCase());
      setStatus("success");
    } catch (err: any) {
      console.error("Error saving order to Supabase:", err);
      setErrorMessage(err.message || "Ocurrió un error al registrar el pedido. Intenta nuevamente.");
      setStatus("error");
    }
  };

  const handleWhatsAppNotify = () => {
    // Format product list for message
    const itemsList = cart
      .map(
        (item) =>
          `- ${item.quantity}x ${item.product.name} (${shopConfig.currencySymbol}${(
            item.product.price * item.quantity
          ).toFixed(2)})`
      )
      .join("\n");

    const totalStr = `${shopConfig.currencySymbol}${cartTotal.toFixed(2)}`;

    // Build complete message
    const message =
      `¡Hola! Acabo de registrar mi pedido en la web.

*ID del Pedido:* #${createdOrderId}
*Detalles del pedido:*
${itemsList}

*Total:* ${totalStr}

*Datos de Envío:*
- *Nombre:* ${formData.name}
- *Teléfono:* ${formData.phone}
- *Dirección:* ${formData.address}
${formData.email ? `- *Email:* ${formData.email}\n` : ""}
Por favor, coordinemos los detalles de pago y envío.`;

    const url = `https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClose = () => {
    if (status === "success") {
      clearCart();
      setStatus("idle");
    }
    setIsCheckoutOpen(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const primaryColor = [27, 138, 90];
    const textColor = [18, 18, 18];
    const lightGray = [245, 245, 245];
    const borderGray = [220, 220, 220];

    // Encabezado verde
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 35, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("LineaVerde", 20, 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Consumo Consciente, Vida Sostenible", 20, 28);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("COMPROBANTE DE PEDIDO", 190, 18, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Pedido ID: #${createdOrderId}`, 190, 23, { align: "right" });
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, 190, 28, { align: "right" });

    // Sección de Datos de Envío
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS DE ENVÍO", 20, 50);

    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.4);
    doc.line(20, 52, 190, 52);

    doc.setFontSize(10);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFont("helvetica", "normal");

    let clientY = 58;
    doc.setFont("helvetica", "bold"); doc.text("Nombre:", 20, clientY);
    doc.setFont("helvetica", "normal"); doc.text(formData.name, 42, clientY);
    clientY += 6;

    doc.setFont("helvetica", "bold"); doc.text("Teléfono:", 20, clientY);
    doc.setFont("helvetica", "normal"); doc.text(formData.phone, 42, clientY);
    clientY += 6;

    if (formData.email) {
      doc.setFont("helvetica", "bold"); doc.text("Email:", 20, clientY);
      doc.setFont("helvetica", "normal"); doc.text(formData.email, 42, clientY);
      clientY += 6;
    }

    doc.setFont("helvetica", "bold"); doc.text("Dirección:", 20, clientY);
    doc.setFont("helvetica", "normal");

    const splitAddress = doc.splitTextToSize(formData.address, 140);
    doc.text(splitAddress, 42, clientY);
    clientY += (splitAddress.length * 5) + 5;

    // Sección de Detalle de Productos
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("DETALLE DEL PEDIDO", 20, clientY);
    doc.line(20, clientY + 2, 190, clientY + 2);

    let tableY = clientY + 8;

    // Cabecera de la tabla
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(20, tableY, 170, 8, "F");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text("PRODUCTO", 22, tableY + 5.5);
    doc.text("CANTIDAD", 110, tableY + 5.5, { align: "center" });
    doc.text("PRECIO UNIT.", 145, tableY + 5.5, { align: "right" });
    doc.text("SUBTOTAL", 185, tableY + 5.5, { align: "right" });

    tableY += 8;

    doc.setFont("helvetica", "normal");
    cart.forEach((item) => {
      doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
      doc.setLineWidth(0.15);
      doc.line(20, tableY, 190, tableY);

      const name = item.product.name;
      const qty = item.quantity.toString();
      const unitPrice = `${shopConfig.currencySymbol}${item.product.price.toFixed(2)}`;
      const subtotal = `${shopConfig.currencySymbol}${(item.product.price * item.quantity).toFixed(2)}`;

      doc.text(name, 22, tableY + 5.5);
      doc.text(qty, 110, tableY + 5.5, { align: "center" });
      doc.text(unitPrice, 145, tableY + 5.5, { align: "right" });
      doc.text(subtotal, 185, tableY + 5.5, { align: "right" });

      tableY += 8;
    });

    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.4);
    doc.line(20, tableY, 190, tableY);

    // Total
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`TOTAL GENERAL:  ${shopConfig.currencySymbol}${cartTotal.toFixed(2)}`, 185, tableY + 7, { align: "right" });

    // Mensaje de pie
    const footerY = tableY + 25;
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.setLineWidth(0.15);
    doc.line(20, footerY - 5, 190, footerY - 5);

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("¿Qué sigue ahora?", 20, footerY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("1. Este comprobante certifica el registro del pedido en nuestro catálogo digital.", 20, footerY + 5);
    doc.text("2. Por favor, pulsa el botón de WhatsApp en la web para coordinar el método de pago y el envío.", 20, footerY + 10);
    doc.text("3. ¡Muchas gracias por elegir LineaVerde y apoyar el consumo sostenible!", 20, footerY + 15);

    doc.save(`LineaVerde_Pedido_${createdOrderId}.pdf`);
  };

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up"
      >
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Confirmar tu Pedido</h2>
          <button
            onClick={handleClose}
            style={styles.closeBtn}
            className="flex-center"
            disabled={status === "loading"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {status === "idle" || status === "loading" ? (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="name">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={status === "loading"}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="phone">Número de WhatsApp / Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="Ej. +51 999 888 777"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={status === "loading"}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="email">Correo Electrónico (Opcional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ej. juan@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  disabled={status === "loading"}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="address">Dirección de Envío *</label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  placeholder="Ej. Calle Las Magnolias 123, Dpto 402, San Isidro"
                  value={formData.address}
                  onChange={handleChange}
                  style={{ ...styles.input, resize: "none" }}
                  disabled={status === "loading"}
                />
              </div>

              {/* Order Summary in Modal */}
              <div style={styles.summaryContainer}>
                <h4 style={styles.summaryTitle}>Resumen del Pedido</h4>
                <div style={styles.summaryItems}>
                  {cart.map((item) => (
                    <div key={item.product.id} style={styles.summaryItemRow}>
                      <span style={styles.summaryItemName}>
                        {item.quantity}x {item.product.name}
                      </span>
                      <span style={styles.summaryItemPrice}>
                        {shopConfig.currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div style={styles.summaryTotalRow}>
                    <span>Total a Pagar:</span>
                    <span>{shopConfig.currencySymbol}{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                style={styles.submitBtn}
                className="btn btn-primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Procesando Pedido...
                  </>
                ) : (
                  "Registrar Pedido"
                )}
              </button>
            </form>
          ) : status === "error" ? (
            /* Error View */
            <div style={styles.successContainer}>
              <AlertCircle size={64} color="var(--danger)" style={{ marginBottom: "1.5rem" }} />
              <h3 style={styles.successTitle}>Error al Registrar</h3>
              <p style={styles.successText}>{errorMessage}</p>
              <button
                onClick={() => setStatus("idle")}
                style={styles.submitBtn}
                className="btn btn-secondary"
              >
                Intentar Nuevamente
              </button>
            </div>
          ) : (
            /* Success View */
            <div style={styles.successContainer}>
              <CheckCircle size={64} color="var(--success)" style={{ marginBottom: "1.5rem" }} />
              <h3 style={styles.successTitle}>¡Pedido Registrado con Éxito!</h3>
              <p style={styles.successText}>
                Tu pedido <strong>#{createdOrderId}</strong> ha sido guardado en nuestro sistema.
              </p>

              <div style={styles.instructionBox}>
                <p style={styles.instructionTitle}>Siguiente Paso Obligatorio:</p>
                <p style={styles.instructionText}>
                  Haz clic en el botón de abajo para enviar los detalles de tu pedido directamente por WhatsApp al encargado. Esto asegurará una atención rápida y la coordinación de tu envío/pago.
                </p>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  onClick={handleWhatsAppNotify}
                  style={styles.whatsappBtn}
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={18} />
                  Enviar Pedido por WhatsApp
                </button>

                <button
                  onClick={handleDownloadPDF}
                  style={styles.pdfBtn}
                  className="btn btn-secondary"
                >
                  <Download size={18} />
                  Descargar Comprobante (PDF)
                </button>
              </div>
            </div>
          )}
        </div>
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
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    animation: "fadeIn var(--transition-fast) forwards",
  },
  modal: {
    width: "100%",
    maxWidth: "500px",
    maxHeight: "90vh",
    backgroundColor: "var(--card)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--card-border)",
    display: "flex",
    flexDirection: "column" as const,
    boxShadow: "var(--shadow-lg)",
    overflow: "hidden",
  },
  header: {
    padding: "1.25rem 1.5rem",
    borderBottom: "1px solid var(--card-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 700,
    margin: 0,
  },
  closeBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "var(--muted-light)",
    border: "none",
    cursor: "pointer",
    color: "var(--foreground)",
  },
  content: {
    padding: "1.5rem",
    overflowY: "auto" as const,
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--muted)",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--card-border)",
    background: "var(--background)",
    outline: "none",
    transition: "border-color var(--transition-fast)",
    fontSize: "0.95rem",
    ":focus": {
      borderColor: "var(--primary)",
    }
  },
  summaryContainer: {
    background: "var(--muted-light)",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid var(--card-border)",
  },
  summaryTitle: {
    fontSize: "0.9rem",
    fontWeight: 700,
    marginBottom: "0.75rem",
  },
  summaryItems: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  summaryItemRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.85rem",
    color: "var(--muted)",
  },
  summaryItemName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    maxWidth: "300px",
  },
  summaryItemPrice: {
    fontWeight: 600,
    color: "var(--foreground)",
  },
  summaryTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 800,
    fontSize: "1rem",
    marginTop: "0.75rem",
    paddingTop: "0.75rem",
    borderTop: "1px solid var(--card-border)",
    color: "var(--foreground)",
  },
  submitBtn: {
    width: "100%",
    padding: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  successContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    padding: "1rem 0",
  },
  successTitle: {
    fontSize: "1.4rem",
    fontWeight: 800,
    marginBottom: "0.5rem",
  },
  successText: {
    fontSize: "0.95rem",
    color: "var(--muted)",
    marginBottom: "1.5rem",
  },
  instructionBox: {
    background: "var(--primary-light)",
    border: "1px solid var(--primary-glow)",
    padding: "1rem",
    borderRadius: "12px",
    marginBottom: "1.5rem",
    maxWidth: "400px",
  },
  instructionTitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "var(--primary)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "0.25rem",
  },
  instructionText: {
    fontSize: "0.85rem",
    color: "var(--foreground)",
    lineHeight: 1.5,
    margin: 0,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
    width: "100%",
    alignItems: "center",
  },
  whatsappBtn: {
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.9rem",
    fontSize: "1rem",
  },
  pdfBtn: {
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.9rem",
    fontSize: "1rem",
    borderColor: "var(--card-border)",
    background: "transparent",
    color: "var(--foreground)",
  }
};
