"use client";

import React from "react";
import { shopConfig } from "@/config/shop";

export default function WhatsAppFloat() {
  const handleWhatsAppRedirect = () => {
    const encodedText = encodeURIComponent(shopConfig.whatsappMessages.generalContact);
    const url = `https://wa.me/${shopConfig.whatsappNumber}?text=${encodedText}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsAppRedirect}
      className="whatsapp-float flex-center animate-fade-in"
      aria-label="Contactar por WhatsApp"
      style={styles.button}
    >
      <svg
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="currentColor"
        style={styles.icon}
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.482 4.978 1.485 5.485.002 9.948-4.456 9.951-9.945.002-2.66-1.019-5.162-2.877-7.02C16.883 1.815 14.385.795 11.73.795c-5.49 0-9.954 4.46-9.958 9.95-.001 1.954.512 3.86 1.488 5.56l-.973 3.555 3.654-.958zm11.758-5.385c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.328-.847 1.069-1.038 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.825-2.274-.192-.329-.02-.507.144-.67.147-.146.328-.383.493-.574.164-.192.219-.328.328-.547.11-.219.055-.41-.027-.574-.082-.164-.738-1.777-1.011-2.434-.266-.64-.537-.552-.738-.562-.191-.01-.41-.01-.628-.01-.219 0-.574.082-.875.41-.301.328-1.148 1.12-1.148 2.73 0 1.61 1.175 3.167 1.339 3.387.164.22 2.312 3.53 5.598 4.95.781.338 1.39.54 1.865.69.784.25 1.498.214 2.062.13.629-.094 1.942-.794 2.216-1.56.273-.766.273-1.422.191-1.56-.082-.138-.301-.219-.629-.383z" />
      </svg>
    </button>
  );
}

const styles = {
  button: {
    border: "none",
    outline: "none",
  },
  icon: {
    // Keep color white
    color: "#ffffff",
  }
};
