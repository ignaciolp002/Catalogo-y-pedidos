-- ====================================================================
-- INSTRUCCIONES PASO A PASO PARA CONFIGURAR SUPABASE
-- ====================================================================
-- Sigue estos pasos para crear tu base de datos sin errores de permisos o restricciones:
--
-- 1. Ve a tu panel de control de Supabase: https://supabase.com/dashboard
-- 2. Entra en tu proyecto "LineaVerdr" (o el proyecto que estés utilizando).
-- 3. En la barra lateral izquierda, haz clic en el icono de "SQL Editor" (el icono con el símbolo 'SQL').
-- 4. Haz clic en "New query" (Nueva consulta) para abrir un editor vacío.
-- 5. Copia TODO el contenido de este archivo y pégalo en el editor de Supabase.
-- 
-- NOTA IMPORTANTE PARA RESOLVER ERRORES PREVIOS:
-- Si anteriormente se ejecutó una parte del script a medias y quedó en un estado dañado o con
-- tablas existentes, desmarca (quita las '--' del inicio) las líneas de la sección "LIMPIEZA DE TABLAS"
-- justo abajo antes de presionar "Run" para borrar las tablas viejas e instalarlas limpiamente.
--
-- 6. Presiona el botón verde "Run" (Ejecutar) en la esquina inferior derecha del editor SQL.
-- 7. Deberías ver un mensaje que dice "Success. No rows returned" (o similar).
-- 8. Ve a la sección "Table Editor" (icono de tabla) en la barra lateral para verificar que
--    las tablas: `categories`, `products`, `orders` y `order_items` existan y tengan datos de prueba.
-- ====================================================================

-- ====================================================================
-- SECCIÓN 0: LIMPIEZA DE TABLAS (Opcional - Quita los '--' para usar si tienes errores previos)
-- ====================================================================
-- DROP TABLE IF EXISTS order_items CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;

-- ====================================================================
-- SECCIÓN 1: CREACIÓN DE TABLAS
-- NOTA: Eliminamos la sentencia 'CREATE EXTENSION "uuid-ossp"' ya que 
-- la función 'gen_random_uuid()' es nativa de Postgres 13+ en Supabase.
-- Esto previene el clásico error de: "permission denied to create extension".
-- ====================================================================

-- 1. Tabla de Categorías
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image_url TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    is_customizable BOOLEAN DEFAULT false NOT NULL, -- Si es true, incita a personalizar por WhatsApp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabla de Pedidos
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150),
    customer_phone VARCHAR(50) NOT NULL,
    customer_address TEXT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    status VARCHAR(50) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabla de Detalles de Pedido (Productos comprados)
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0), -- Guarda el precio al momento de la compra
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- SECCIÓN 2: SEGURIDAD A NIVEL DE FILA (RLS)
-- Configuramos las políticas de seguridad para que la app cliente (anon) 
-- y los administradores autenticados tengan los accesos correctos.
-- ====================================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para Categorías (Lectura pública para todos, control total para admins)
DROP POLICY IF EXISTS "Permitir lectura pública de categorías" ON categories;
CREATE POLICY "Permitir lectura pública de categorías" ON categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Administradores control total categorías" ON categories;
CREATE POLICY "Administradores control total categorías" ON categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Políticas para Productos (Lectura pública de productos activos, control total para admins)
DROP POLICY IF EXISTS "Permitir lectura pública de productos activos" ON products;
CREATE POLICY "Permitir lectura pública de productos activos" ON products
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Administradores control total productos" ON products;
CREATE POLICY "Administradores control total productos" ON products
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Políticas para Pedidos (Cualquier cliente anon puede crearlos, control total para admins)
DROP POLICY IF EXISTS "Permitir creación pública de pedidos" ON orders;
CREATE POLICY "Permitir creación pública de pedidos" ON orders
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Administradores control total pedidos" ON orders;
CREATE POLICY "Administradores control total pedidos" ON orders
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Políticas para Detalles de Pedido (Cualquier cliente anon puede crearlos, control total para admins)
DROP POLICY IF EXISTS "Permitir creación pública de items de pedido" ON order_items;
CREATE POLICY "Permitir creación pública de items de pedido" ON order_items
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Administradores control total items" ON order_items;
CREATE POLICY "Administradores control total items" ON order_items
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ====================================================================
-- SECCIÓN 3: DATOS DE PRUEBA (MOCK DATA)
-- Limpiamos datos anteriores para evitar conflictos y cargamos el nuevo catálogo.
-- ====================================================================

-- 1. Limpieza de datos antiguos
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE orders CASCADE;
DELETE FROM products;
DELETE FROM categories;

-- 2. Insertar Nuevas Categorías
INSERT INTO categories (id, name, slug) VALUES
('c1b9b6be-d8a4-473d-8ab1-19d264feee71', 'Corporativo', 'corporativo'),
('c1b9b6be-d8a4-473d-8ab1-19d264feee72', 'Línea Verde', 'linea-verde'),
('c1b9b6be-d8a4-473d-8ab1-19d264feee73', 'Puestos de Venta', 'puestos-de-venta'),
('c1b9b6be-d8a4-473d-8ab1-19d264feee74', 'Stands', 'stands'),
('c1b9b6be-d8a4-473d-8ab1-19d264feee75', 'Cumpleaños', 'cumpleanos'),
('c1b9b6be-d8a4-473d-8ab1-19d264feee76', 'Para Niños', 'para-ninos');

-- 3. Insertar Nuevos Productos (Sin imagen de momento)
INSERT INTO products (id, category_id, name, description, price, image_url, is_active, is_customizable) VALUES
-- Corporativo
('d1b9b6be-d8a4-473d-8ab1-19d264feee71', 'c1b9b6be-d8a4-473d-8ab1-19d264feee71', 'Regalos Corporativos Sostenibles', 'Sets de oficina ecológicos personalizados con el logo de tu empresa. Incluye libreta de corcho y bolígrafo de bambú.', 15.00, NULL, true, true),
('d1b9b6be-d8a4-473d-8ab1-19d264feee72', 'c1b9b6be-d8a4-473d-8ab1-19d264feee71', 'Welcome Packs Ecológicos', 'Kit de bienvenida para nuevos colaboradores. Incluye termo de acero inoxidable de doble pared y bolso tote de lona orgánica.', 25.00, NULL, true, true),
-- Línea Verde
('d1b9b6be-d8a4-473d-8ab1-19d264feee73', 'c1b9b6be-d8a4-473d-8ab1-19d264feee72', 'Kit Basura Cero (Zero Waste)', 'Pack de bolsas de malla para compras, pajitas de acero inoxidable con limpiador y envoltorios reutilizables de cera de abejas.', 19.90, NULL, true, false),
('d1b9b6be-d8a4-473d-8ab1-19d264feee74', 'c1b9b6be-d8a4-473d-8ab1-19d264feee72', 'Jabones Orgánicos Exfoliantes', 'Set de 3 jabones artesanales exfoliantes a base de avena, caléndula, coco y aceites esenciales. 100% biodegradables.', 12.00, NULL, true, false),
-- Puestos de Venta
('d1b9b6be-d8a4-473d-8ab1-19d264feee75', 'c1b9b6be-d8a4-473d-8ab1-19d264feee73', 'Exhibidor Sostenible de Mesa', 'Exhibidor rústico y modular de madera recuperada para productos pequeños en cajas registradoras o mostradores.', 45.00, NULL, true, true),
('d1b9b6be-d8a4-473d-8ab1-19d264feee76', 'c1b9b6be-d8a4-473d-8ab1-19d264feee73', 'Letreros de Madera Grabados', 'Carteles informativos o de precios hechos de bambú grabado con láser. Ideales para comunicar la sostenibilidad en tienda.', 18.00, NULL, true, true),
-- Stands
('d1b9b6be-d8a4-473d-8ab1-19d264feee77', 'c1b9b6be-d8a4-473d-8ab1-19d264feee74', 'Stand Ecológico Desmontable', 'Estructura modular resistente de cartón prensado y madera certificada. Fácil de transportar y armar en ferias comerciales.', 150.00, NULL, true, true),
('d1b9b6be-d8a4-473d-8ab1-19d264feee78', 'c1b9b6be-d8a4-473d-8ab1-19d264feee74', 'Banner Roll-Up de Bambú', 'Soporte publicitario elegante de bambú con lona de algodón orgánico. Estampado con tintas ecológicas no tóxicas.', 85.00, NULL, true, true),
-- Cumpleaños
('d1b9b6be-d8a4-473d-8ab1-19d264feee79', 'c1b9b6be-d8a4-473d-8ab1-19d264feee75', 'Recuerdos de Cumpleaños Sostenibles', 'Mini suculentas en macetas biodegradables de fibra de coco, con etiquetas personalizadas impresas en papel semilla.', 4.00, NULL, true, true),
('d1b9b6be-d8a4-473d-8ab1-19d264feee80', 'c1b9b6be-d8a4-473d-8ab1-19d264feee75', 'Kit de Fiesta Residuo Cero', 'Platos de hoja de palmera, vasos biodegradables y cubiertos de madera de abedul para 10 personas. Compostables tras su uso.', 22.00, NULL, true, false),
-- Para Niños
('d1b9b6be-d8a4-473d-8ab1-19d264feee81', 'c1b9b6be-d8a4-473d-8ab1-19d264feee76', 'Set de Cubiertos Infantiles de Bambú', 'Tenedor, cuchara y cuchillo de bambú suave con bordes redondeados y estuche de tela de algodón lavable.', 9.50, NULL, true, false),
('d1b9b6be-d8a4-473d-8ab1-19d264feee82', 'c1b9b6be-d8a4-473d-8ab1-19d264feee76', 'Juguete de Madera Didáctico', 'Bloques de construcción de formas geométricas hechos de madera reforestada. Pintados a mano con tintas no tóxicas al agua.', 14.90, NULL, true, false);
