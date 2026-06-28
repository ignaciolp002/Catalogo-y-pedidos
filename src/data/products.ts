import { Product } from "@/context/CartContext";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const SEED_CATEGORIES: Category[] = [
  { id: "c1b9b6be-d8a4-473d-8ab1-19d264feee60", name: "Cuidado Personal", slug: "cuidado-personal" },
  { id: "c2b9b6be-d8a4-473d-8ab1-19d264feee61", name: "Hogar y Cocina", slug: "hogar-y-cocina" },
  { id: "c3b9b6be-d8a4-473d-8ab1-19d264feee62", name: "Accesorios", slug: "accesorios" }
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: "p1",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee60",
    name: "Cepillo de Dientes de Bambú",
    description: "Cepillo de dientes biodegradable de bambú Moso con cerdas suaves de carbón activado.",
    price: 3.50,
    image_url: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    is_customizable: false
  },
  {
    id: "p2",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee60",
    name: "Shampoo en Barra de Hierbas",
    description: "Shampoo sólido orgánico a base de romero, menta y ortiga. Rinde hasta 80 lavados sin envase plástico.",
    price: 8.90,
    image_url: "https://images.unsplash.com/photo-1607006342411-9c3f57e2fa01?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    is_customizable: false
  },
  {
    id: "p3",
    category_id: "c2b9b6be-d8a4-473d-8ab1-19d264feee61",
    name: "Termo de Acero Inoxidable",
    description: "Termo de doble pared de 500ml. Mantiene bebidas frías por 24 horas y calientes por 12 horas. Grabado personalizado disponible.",
    price: 18.00,
    image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    is_customizable: true
  },
  {
    id: "p4",
    category_id: "c2b9b6be-d8a4-473d-8ab1-19d264feee61",
    name: "Set de Bolsas Reutilizables",
    description: "Pack de 5 bolsas de algodón orgánico de malla para frutas y verduras. Lavables y duraderas.",
    price: 12.00,
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    is_customizable: false
  },
  {
    id: "p5",
    category_id: "c3b9b6be-d8a4-473d-8ab1-19d264feee62",
    name: "Bolso Tote de Lona Orgánica",
    description: "Bolso tote de algodón 100% orgánico, resistente y espacioso. Estampado personalizable para eventos o regalos.",
    price: 10.50,
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    is_customizable: true
  },
  {
    id: "p6",
    category_id: "c3b9b6be-d8a4-473d-8ab1-19d264feee62",
    name: "Llavero de Madera Grabado",
    description: "Llavero artesanal hecho con madera recuperada. Diseño totalmente personalizable bajo pedido por WhatsApp.",
    price: 4.50,
    image_url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
    is_active: true,
    is_customizable: true
  }
];
