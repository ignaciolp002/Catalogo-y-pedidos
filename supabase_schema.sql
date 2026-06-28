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
-- Usamos identificadores UUID fijos para que el script pueda ejecutarse
-- varias veces sin causar errores de duplicación de llaves primarias.
-- ====================================================================

-- 1. Insertar Categorías
INSERT INTO categories (id, name, slug) VALUES
('c1b9b6be-d8a4-473d-8ab1-19d264feee60', 'Cuidado Personal', 'cuidado-personal'),
('c2b9b6be-d8a4-473d-8ab1-19d264feee61', 'Hogar y Cocina', 'hogar-y-cocina'),
('c3b9b6be-d8a4-473d-8ab1-19d264feee62', 'Accesorios', 'accesorios')
ON CONFLICT (id) DO NOTHING;

-- 2. Insertar Productos
INSERT INTO products (id, category_id, name, description, price, image_url, is_active, is_customizable) VALUES
-- Cuidado Personal
('d1b9b6be-d8a4-473d-8ab1-19d264feee01', 'c1b9b6be-d8a4-473d-8ab1-19d264feee60', 'Cepillo de Dientes de Bambú', 'Cepillo de dientes biodegradable de bambú Moso con cerdas suaves de carbón activado.', 3.50, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80', true, false),
('d1b9b6be-d8a4-473d-8ab1-19d264feee02', 'c1b9b6be-d8a4-473d-8ab1-19d264feee60', 'Shampoo en Barra de Hierbas', 'Shampoo sólido orgánico a base de romero, menta y ortiga. Rinde hasta 80 lavados sin envase plástico.', 8.90, 'https://images.unsplash.com/photo-1607006342411-9c3f57e2fa01?auto=format&fit=crop&w=600&q=80', true, false),
-- Hogar y Cocina
('d1b9b6be-d8a4-473d-8ab1-19d264feee03', 'c2b9b6be-d8a4-473d-8ab1-19d264feee61', 'Termo de Acero Inoxidable', 'Termo de doble pared de 500ml. Mantiene bebidas frías por 24 horas y calientes por 12 horas. Grabado personalizado disponible.', 18.00, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80', true, true),
('d1b9b6be-d8a4-473d-8ab1-19d264feee04', 'c2b9b6be-d8a4-473d-8ab1-19d264feee61', 'Set de Bolsas Reutilizables', 'Pack de 5 bolsas de algodón orgánico de malla para frutas y verduras. Lavables y duraderas.', 12.00, 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80', true, false),
-- Accesorios
('d1b9b6be-d8a4-473d-8ab1-19d264feee05', 'c3b9b6be-d8a4-473d-8ab1-19d264feee62', 'Bolso Tote de Lona Orgánica', 'Bolso tote de algodón 100% orgánico, resistente y espacioso. Estampado personalizable para eventos o regalos.', 10.50, 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80', true, true),
('d1b9b6be-d8a4-473d-8ab1-19d264feee06', 'c3b9b6be-d8a4-473d-8ab1-19d264feee62', 'Llavero de Madera Grabado', 'Llavero artesanal hecho con madera recuperada. Diseño totalmente personalizable bajo pedido por WhatsApp.', 4.50, 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80', true, true)
ON CONFLICT (id) DO NOTHING;
