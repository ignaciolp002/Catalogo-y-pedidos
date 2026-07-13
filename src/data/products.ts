import { Product } from "@/context/CartContext";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const SEED_CATEGORIES: Category[] = [
  { id: "c1b9b6be-d8a4-473d-8ab1-19d264feee71", name: "Corporativo", slug: "corporativo" },
  { id: "c1b9b6be-d8a4-473d-8ab1-19d264feee72", name: "Línea Verde", slug: "linea-verde" },
  { id: "c1b9b6be-d8a4-473d-8ab1-19d264feee73", name: "Puestos de Venta", slug: "puestos-de-venta" },
  { id: "c1b9b6be-d8a4-473d-8ab1-19d264feee74", name: "Stands", slug: "stands" },
  { id: "c1b9b6be-d8a4-473d-8ab1-19d264feee75", name: "Cumpleaños", slug: "cumpleanos" },
  { id: "c1b9b6be-d8a4-473d-8ab1-19d264feee76", name: "Para Niños", slug: "para-ninos" }
];

export const SEED_PRODUCTS: Product[] = [
  // 1. Corporativo
  {
    id: "p_corp_1",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee71",
    name: "Regalos Corporativos Sostenibles",
    description: "Sets de oficina ecológicos personalizados con el logo de tu empresa. Incluye libreta de corcho y bolígrafo de bambú.",
    price: 15.00,
    image_url: "",
    is_active: true,
    is_customizable: true
  },
  {
    id: "p_corp_2",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee71",
    name: "Welcome Packs Ecológicos",
    description: "Kit de bienvenida para nuevos colaboradores. Incluye termo de acero inoxidable de doble pared y bolso tote de lona orgánica.",
    price: 25.00,
    image_url: "",
    is_active: true,
    is_customizable: true
  },

  // 2. Línea Verde
  {
    id: "p_lv_1",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee72",
    name: "Kit Basura Cero (Zero Waste)",
    description: "Pack de bolsas de malla para compras, pajitas de acero inoxidable con limpiador y envoltorios reutilizables de cera de abejas.",
    price: 19.90,
    image_url: "",
    is_active: true,
    is_customizable: false
  },
  {
    id: "p_lv_2",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee72",
    name: "Jabones Orgánicos Exfoliantes",
    description: "Set de 3 jabones artesanales exfoliantes a base de avena, caléndula, coco y aceites esenciales. 100% biodegradables.",
    price: 12.00,
    image_url: "",
    is_active: true,
    is_customizable: false
  },

  // 3. Puestos de Venta
  {
    id: "p_pv_1",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee73",
    name: "Exhibidor Sostenible de Mesa",
    description: "Exhibidor rústico y modular de madera recuperada para productos pequeños en cajas registradoras o mostradores.",
    price: 45.00,
    image_url: "",
    is_active: true,
    is_customizable: true
  },
  {
    id: "p_pv_2",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee73",
    name: "Letreros de Madera Grabados",
    description: "Carteles informativos o de precios hechos de bambú grabado con láser. Ideales para comunicar la sostenibilidad en tienda.",
    price: 18.00,
    image_url: "",
    is_active: true,
    is_customizable: true
  },

  // 4. Stands
  {
    id: "p_std_1",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee74",
    name: "Stand Ecológico Desmontable",
    description: "Estructura modular resistente de cartón prensado y madera certificada. Fácil de transportar y armar en ferias comerciales.",
    price: 150.00,
    image_url: "",
    is_active: true,
    is_customizable: true
  },
  {
    id: "p_std_2",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee74",
    name: "Banner Roll-Up de Bambú",
    description: "Soporte publicitario elegante de bambú con lona de algodón orgánico. Estampado con tintas ecológicas no tóxicas.",
    price: 85.00,
    image_url: "",
    is_active: true,
    is_customizable: true
  },

  // 5. Cumpleaños
  {
    id: "p_cump_1",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee75",
    name: "Recuerdos de Cumpleaños Sostenibles",
    description: "Mini suculentas en macetas biodegradables de fibra de coco, con etiquetas personalizadas impresas en papel semilla.",
    price: 4.00,
    image_url: "",
    is_active: true,
    is_customizable: true
  },
  {
    id: "p_cump_2",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee75",
    name: "Kit de Fiesta Residuo Cero",
    description: "Platos de hoja de palmera, vasos biodegradables y cubiertos de madera de abedul para 10 personas. Compostables tras su uso.",
    price: 22.00,
    image_url: "",
    is_active: true,
    is_customizable: false
  },

  // 6. Para Niños
  {
    id: "p_ninos_1",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee76",
    name: "Set de Cubiertos Infantiles de Bambú",
    description: "Tenedor, cuchara y cuchillo de bambú suave con bordes redondeados y estuche de tela de algodón lavable.",
    price: 9.50,
    image_url: "",
    is_active: true,
    is_customizable: false
  },
  {
    id: "p_ninos_2",
    category_id: "c1b9b6be-d8a4-473d-8ab1-19d264feee76",
    name: "Juguete de Madera Didáctico",
    description: "Bloques de construcción de formas geométricas hechos de madera reforestada. Pintados a mano con tintas no tóxicas al agua.",
    price: 14.90,
    image_url: "",
    is_active: true,
    is_customizable: false
  }
];
