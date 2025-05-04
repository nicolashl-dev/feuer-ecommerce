-- Crear tabla de categorías
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  short_description VARCHAR(255),
  description TEXT,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de usuarios (complementa la autenticación de Supabase)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  region VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  total INTEGER NOT NULL,
  shipping_address TEXT,
  shipping_city VARCHAR(100),
  shipping_region VARCHAR(100),
  shipping_postal_code VARCHAR(20),
  shipping_phone VARCHAR(50),
  payment_method VARCHAR(50),
  payment_status VARCHAR(50),
  transaction_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de detalles de pedidos
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar categorías de ejemplo
INSERT INTO categories (name, description) VALUES
('Estufas a Leña', 'Estufas tradicionales que utilizan leña como combustible'),
('Estufas a Pellet', 'Estufas modernas que utilizan pellets de madera como combustible'),
('Estufas Híbridas', 'Estufas que pueden utilizar tanto leña como pellets');

-- Insertar productos de ejemplo
INSERT INTO products (name, short_description, description, price, stock, category_id, featured) VALUES
('Estufa Modelo Premium 1', 'Estufa a combustión lenta de alta eficiencia', 'Esta estufa a combustión lenta ofrece un rendimiento excepcional, calentando espacios de hasta 90m² con un consumo mínimo de leña. Su diseño moderno se integra perfectamente en cualquier decoración, mientras que su sistema de doble combustión garantiza una mayor eficiencia y menor emisión de partículas.', 299990, 15, (SELECT id FROM categories WHERE name = 'Estufas a Leña'), true),
('Estufa Modelo Premium 2', 'Estufa a combustión lenta con control de aire', 'Diseñada para espacios medianos, esta estufa cuenta con un sistema avanzado de control de aire que permite regular la intensidad del fuego y la duración de la combustión. Su cámara de combustión de gran tamaño acepta troncos de hasta 50cm.', 349990, 8, (SELECT id FROM categories WHERE name = 'Estufas a Leña'), true),
('Estufa Modelo Premium 3', 'Estufa a pellet con programación digital', 'Esta moderna estufa a pellet cuenta con un sistema de programación digital que permite configurar horarios de encendido y apagado, así como la temperatura deseada. Su alimentador automático garantiza una combustión constante y eficiente.', 399990, 12, (SELECT id FROM categories WHERE name = 'Estufas a Pellet'), true),
('Estufa Modelo Premium 4', 'Estufa a pellet con WiFi integrado', 'Controla tu estufa desde cualquier lugar con la aplicación móvil. Esta estufa a pellet de última generación cuenta con conectividad WiFi, permitiéndote ajustar la temperatura, programar horarios y monitorear el consumo de combustible desde tu smartphone.', 449990, 5, (SELECT id FROM categories WHERE name = 'Estufas a Pellet'), false),
('Estufa Modelo Premium 5', 'Estufa híbrida de alta potencia', 'La versatilidad en calefacción: esta estufa híbrida te permite utilizar tanto leña como pellets según tu preferencia. Con una potencia de 12kW, es ideal para espacios grandes de hasta 120m². Incluye un sistema de limpieza automática para mayor comodidad.', 499990, 3, (SELECT id FROM categories WHERE name = 'Estufas Híbridas'), true);

-- Crear función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para actualizar updated_at automáticamente
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
