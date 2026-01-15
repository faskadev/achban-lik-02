# Achban-Lik Backend API

Restaurant review application backend built with Express and Sequelize.

## Features

- JWT Authentication
- User roles (user/admin)
- Restaurant CRUD operations (admin only)
- Review system with one review per user per restaurant
- Image upload for restaurants
- City-based filtering
- Rating aggregation

## Tech Stack

- Node.js & Express
- Sequelize ORM
- SQLite database
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing

## Installation

```bash
# Install dependencies
npm install

# Seed the database with demo data
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Restaurants
- `GET /api/restaurants` - Get all restaurants (with filters)
- `GET /api/restaurants/:id` - Get restaurant by ID
- `GET /api/restaurants/filters/cities` - Get unique cities
- `POST /api/restaurants` - Create restaurant (Admin only)
- `PUT /api/restaurants/:id` - Update restaurant (Admin only)
- `DELETE /api/restaurants/:id` - Delete restaurant (Admin only)

### Reviews
- `GET /api/reviews/me` - Get current user's reviews (Protected)
- `GET /api/reviews/can-review/:restaurantId` - Check if user can review (Protected)
- `POST /api/reviews` - Create review (Protected)
- `PUT /api/reviews/:id` - Update review (Protected)
- `DELETE /api/reviews/:id` - Delete review (Protected)

## Default Accounts

### Admin
- Email: `admin@achbanlik.com`
- Password: `admin123`

### Test User
- Email: `ahmed@example.com`
- Password: `password123`

## Environment Variables

Create a `.env` file:

```
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

## Project Structure

```
backend/
├── controllers/       # Request handlers
├── middleware/        # Custom middleware
├── models/            # Sequelize models
├── routes/            # API routes
├── seeders/           # Database seeders
├── uploads/           # Uploaded images
├── server.js          # Entry point
└── package.json
```
