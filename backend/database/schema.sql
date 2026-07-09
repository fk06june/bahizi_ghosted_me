-- ============================================================
-- BAHIZI CAFÉ & RESTAURANT — Database Schema
-- ============================================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  loyalty_points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT REFERENCES categories(id),
  image_url VARCHAR(500),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INT NOT NULL,
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  product_id INT REFERENCES products(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loyalty Points History Table
CREATE TABLE IF NOT EXISTS loyalty_points_history (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  points INT NOT NULL,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Indexes for Performance
-- ============================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_reservations_date ON reservations(reservation_date);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- ============================================================
-- Insert Sample Data
-- ============================================================

-- Categories
INSERT INTO categories (name, description, slug) VALUES
('Café', 'Nos délicieux cafés', 'cafe'),
('Boissons Chaudes', 'Chocolats, thés, etc.', 'boissons-chaudes'),
('Boissons Froides', 'Smoothies, jus, etc.', 'boissons-froides'),
('Petit-Déjeuner', 'Petit-déjeuner complet', 'petit-dejeuner'),
('Plats Principaux', 'Plats savoureux', 'plats-principaux'),
('Desserts', 'Gâteaux et pâtisseries', 'desserts'),
('Accessoires', 'Grains, équipements', 'accessoires')
ON CONFLICT DO NOTHING;

-- Products
INSERT INTO products (name, description, price, category_id, available) VALUES
('Espresso', 'Espresso classique riche et intense', 3.50, 1, TRUE),
('Cappuccino', 'Espresso avec mousse de lait crémeuse', 4.50, 1, TRUE),
('Latte', 'Espresso lisse avec lait chaud', 4.00, 1, TRUE),
('Americano', 'Espresso allongé à l''eau chaude', 3.00, 1, TRUE),
('Macchiato', 'Espresso avec un trait de lait', 4.00, 1, TRUE),
('Flat White', 'Espresso avec lait vaporisé', 4.50, 1, TRUE),
('Café Crème', 'Café long avec crème', 3.50, 1, TRUE),
('Iced Coffee', 'Café froid rafraîchissant', 4.25, 3, TRUE),
('Chocolat Chaud', 'Chocolat premium riche', 3.50, 2, TRUE),
('Thé Assortis', 'Thés noirs, verts, blancs', 2.50, 2, TRUE),
('Smoothie Fruits', 'Smoothie frais aux fruits', 5.00, 3, TRUE),
('Jus Naturel', 'Jus frais pressé', 4.00, 3, TRUE),
('Croissant', 'Croissant beurre feuilleté', 2.50, 4, TRUE),
('Oeufs Brouillés', 'Oeufs brouillés avec pain', 6.00, 4, TRUE),
('Pancakes', 'Pancakes avec sirop et fruits', 7.00, 4, TRUE),
('Salade César', 'Salade fraîche avec poulet', 8.00, 5, TRUE),
('Sandwich Club', 'Sandwich triple avec jambon', 7.50, 5, TRUE),
('Pâtes Carbonara', 'Pâtes crémeuses classiques', 9.00, 5, TRUE),
('Gâteau Chocolat', 'Gâteau au chocolat décadent', 4.50, 6, TRUE),
('Cheesecake', 'Cheesecake New York', 5.00, 6, TRUE),
('Grains Bahizi', 'Grains de café premium 250g', 12.00, 7, TRUE),
('Tasse Bahizi', 'Tasse en céramique premium', 15.00, 7, TRUE)
ON CONFLICT DO NOTHING;
