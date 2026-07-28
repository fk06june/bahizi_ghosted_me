# Bahizi Café & Restaurant — Backend API

API REST pour le site Bahizi Café & Restaurant, construite avec Node.js, Express et PostgreSQL.

## 🚀 Installation

### Prérequis
- Node.js 14+
- PostgreSQL 12+
- npm ou yarn

### Étapes

1. **Cloner le repo**
```bash
git clone https://github.com/fk06june/bahizi_ghosted_me.git
cd bahizi_ghosted_me/backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la base de données**
```bash
# Créer la base de données
createdb bahizi_db

# Charger le schéma
psql bahizi_db < ../database/schema.sql
```

4. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditer .env avec tes paramètres
```

5. **Démarrer le serveur**
```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`

## 📚 API Endpoints

### Products
- `GET /api/products` - Tous les produits
- `GET /api/products?category_id=1` - Produits par catégorie
- `GET /api/products?search=cafe` - Rechercher des produits
- `GET /api/products/:id` - Détail d'un produit
- `GET /api/products/categories/all` - Toutes les catégories

### Reservations
- `POST /api/reservations` - Créer une réservation
- `GET /api/reservations` - Toutes les réservations (admin)
- `GET /api/reservations/user/:userId` - Réservations de l'utilisateur (authentifié)
- `PUT /api/reservations/:id` - Mettre à jour une réservation
- `DELETE /api/reservations/:id` - Supprimer une réservation

### Orders
- `POST /api/orders` - Créer une commande (authentifié)
- `GET /api/orders/user/:userId` - Commandes de l'utilisateur (authentifié)
- `GET /api/orders/:id` - Détail d'une commande
- `PUT /api/orders/:id` - Mettre à jour le statut

### Users
- `POST /api/users/register` - Inscription
- `POST /api/users/login` - Connexion
- `GET /api/users/profile/:id` - Profil utilisateur (authentifié)
- `PUT /api/users/profile/:id` - Mettre à jour le profil (authentifié)

### Contact
- `POST /api/contact` - Envoyer un message
- `GET /api/contact` - Tous les messages (admin)
- `PUT /api/contact/:id` - Mettre à jour le statut

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification.

### Exemple d'utilisation

**1. Inscription**
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "first_name": "Jean",
    "last_name": "Dupont"
  }'
```

**2. Connexion**
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**3. Utiliser le token**
```bash
curl -X GET http://localhost:3000/api/users/profile/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📊 Structure de la Base de Données

### Tables principales
- `users` - Utilisateurs
- `products` - Produits (café, plats, accessoires)
- `categories` - Catégories de produits
- `reservations` - Réservations de tables
- `orders` - Commandes
- `order_items` - Détail des commandes
- `reviews` - Avis clients
- `loyalty_points_history` - Historique des points
- `contact_messages` - Messages de contact

## 🔧 Configuration

### Variables d'environnement (.env)

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bahizi_db
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

## 📝 Exemples de Requêtes

### Créer une réservation
```bash
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+257 79 22 22 22",
    "reservation_date": "2024-12-25",
    "reservation_time": "19:00",
    "guests": 4,
    "special_requests": "Table près de la fenêtre"
  }'
```

### Créer une commande
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "items": [
      {"product_id": 1, "quantity": 2},
      {"product_id": 5, "quantity": 1}
    ],
    "delivery_address": "123 Rue de la Paix, Bujumbura",
    "notes": "Pas de sucre dans le café"
  }'
```

### Envoyer un message de contact
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marie",
    "email": "marie@example.com",
    "phone": "+257 79 11 11 11",
    "message": "J'\''aimerais organiser un événement chez vous"
  }'
```

## 🚀 Déploiement

### Heroku
```bash
heroku login
heroku create bahizi-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku master
```

### Vercel
```bash
vercel
```

### DigitalOcean / AWS
Voir la documentation respective pour les détails.

## 📄 Licence

MIT

## 👥 Support

Pour toute question ou problème, contacte-nous à info@bahizi.bi
