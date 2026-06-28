// Configuración general de la tienda
// Esto permite adaptar el catálogo para cualquier cliente en minutos

export const shopConfig = {
  name: "LineaVerde",
  currency: "USD", // Símbolo de moneda (ej: USD, EUR, PEN, MXN)
  currencySymbol: "$",
  whatsappNumber: "51987654321", // Número de WhatsApp con código de país (sin + ni espacios)
  notificationEmail: "pedidos@lineaverde.com", // Correo para recibir notificaciones
  
  // Mensajes predefinidos para WhatsApp
  whatsappMessages: {
    generalContact: "¡Hola! Quisiera realizar una consulta personalizada sobre los productos de LineaVerde.",
    productQuery: (productName: string) => `¡Hola! Me interesa obtener más información y detalles de personalización del producto: *${productName}*.`,
    checkoutNotification: (orderId: string, total: string, itemsList: string) => 
      `¡Hola! Acabo de registrar mi pedido en la web.\n\n*ID del Pedido:* #${orderId.substring(0, 8)}\n*Detalles del pedido:*\n${itemsList}\n*Total:* ${total}\n\nPor favor, coordinemos los detalles de pago y envío.`,
  }
};
