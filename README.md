# 🍽️ Achban-Lik

**Restaurant Review Mobile Application** - A full-stack training project for learning mobile development

## 📱 Overview

Achban-Lik is a mobile application that allows users to discover restaurants, read reviews, and share their dining experiences. Admin users can manage the restaurant database, while regular users can add one review per restaurant.

> ⚠️ **Educational Project**: This application is built for learning purposes and demonstrates modern mobile development practices.

## ✨ Features

### For Users
- ✅ Browse restaurant listings with filters
- ✅ View detailed restaurant information
- ✅ Read and write reviews (one per restaurant)
- ✅ Edit and delete own reviews
- ✅ View all personal reviews in one place
- ✅ Filter restaurants by city
- ✅ See aggregated ratings

### For Admins
- ✅ Full restaurant CRUD operations
- ✅ Upload restaurant images
- ✅ Manage all restaurant data
- ✅ All user features included

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with Express
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT tokens
- **File Upload**: Multer
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: Zustand
- **Data Fetching**: React Query
- **HTTP Client**: Axios
- **Storage**: Expo SecureStore
- **Image Handling**: Expo Image Picker

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (will be installed with dependencies)
- Mobile device with Expo Go app OR emulator

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd achban-lik
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run seed     # Seed database with demo data
   npm run dev      # Start backend server
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

4. **Configure API URL**
   
   Edit `frontend/config/api.js` and update the API URL:
   
   ```javascript
   // For physical device (replace with your IP)
   const API_BASE_URL = 'http://192.168.1.X:3000/api';
   
   // For Android emulator
   const API_BASE_URL = 'http://10.0.2.2:3000/api';
   
   // For iOS simulator
   const API_BASE_URL = 'http://localhost:3000/api';
   ```

5. **Start Frontend**
   ```bash
   npm start
   ```

6. **Run on your device**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## 👥 Demo Accounts

The seeded database includes these accounts:

### Admin Account
- **Email**: `admin@achbanlik.com`
- **Password**: `admin123`

### Regular User
- **Email**: `ahmed@example.com`
- **Password**: `password123`

## 📂 Project Structure

```
achban-lik/
├── backend/
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & upload middleware
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   ├── seeders/           # Database seeders
│   ├── uploads/           # Uploaded images
│   └── server.js          # Entry point
│
└── frontend/
    ├── app/               # Expo Router screens
    ├── assets/            # Images and icons
    ├── config/            # API configuration
    ├── store/             # Zustand stores
    └── package.json
```

## 🎯 Learning Objectives

This project demonstrates:

1. **Mobile Development**
   - React Native fundamentals
   - Expo ecosystem
   - File-based routing with Expo Router
   - Mobile UI/UX best practices

2. **State Management**
   - Client state with Zustand
   - Server state with React Query
   - Authentication flow
   - Cache management

3. **Backend Development**
   - RESTful API design
   - MVC architecture
   - Database relationships
   - Authentication & authorization
   - File uploads

4. **Full-Stack Integration**
   - API communication
   - Token-based auth
   - Image handling
   - Error handling
   - Data validation

## 📱 Application Screens

### Authentication Flow
1. **Splash Screen** → Auto redirects after 2s
2. **Auth Choice** → Login or Register
3. **Login/Register** → Create account or sign in

### Main App Flow
1. **Restaurants List** → Browse all restaurants
2. **Restaurant Details** → View info and reviews
3. **Add/Edit Review** → Share your experience
4. **My Reviews** → Manage your reviews
5. **Admin Panel** → Manage restaurants (admin only)

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Secure token storage
- Role-based access control
- Protected API routes
- Input validation

## 📊 Database Schema

### User
- id, name, email, password (hashed), role

### Restaurant
- id, name, shortDescription, longDescription
- address, city, latitude, longitude
- mainImage, timestamps

### Review
- id, rating (1-5), comment, visitDate
- userId, restaurantId, timestamps
- **Unique constraint**: (userId, restaurantId)

## 🎨 UI/UX Features

- Modern, clean interface
- Smooth animations
- Pull-to-refresh
- Loading states
- Error handling
- Empty states
- Responsive design

## 🧪 Testing the App

1. **User Flow**:
   - Register a new account
   - Browse restaurants
   - Add a review
   - Edit your review
   - View "My Reviews"

2. **Admin Flow**:
   - Login as admin
   - Add a new restaurant
   - Edit restaurant details
   - Delete a restaurant

3. **Business Rules**:
   - Try adding multiple reviews to same restaurant (should fail)
   - Check that ratings update correctly
   - Verify only owners can edit/delete reviews

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3000 is available
- Verify all dependencies are installed
- Check .env file exists

### Frontend can't connect
- Verify backend is running
- Check API_BASE_URL in config/api.js
- For Android emulator, use 10.0.2.2
- For physical device, use your computer's local IP

### Images not uploading
- Check backend uploads/ directory exists
- Verify multer middleware is working
- Grant camera/gallery permissions on device

### Auth not persisting
- Clear app data and reinstall
- Check SecureStore functionality
- Verify tokens are being saved

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Restaurants
- `GET /api/restaurants` - List restaurants
- `GET /api/restaurants/:id` - Get restaurant
- `POST /api/restaurants` - Create (admin)
- `PUT /api/restaurants/:id` - Update (admin)
- `DELETE /api/restaurants/:id` - Delete (admin)

### Reviews
- `GET /api/reviews/me` - Get user's reviews
- `GET /api/reviews/can-review/:id` - Check if can review
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🎓 What You'll Learn

- React Native mobile development
- Expo ecosystem and tools
- Navigation with Expo Router
- State management patterns
- API integration
- Authentication flows
- Image handling
- Database design
- Backend API development
- Full-stack architecture

## 🤝 Contributing

This is an educational project. Feel free to:
- Fork and experiment
- Add new features
- Improve the code
- Share your learnings

## 📄 License

This project is for educational purposes only.

## 👏 Acknowledgments

Built as a training project to demonstrate modern mobile app development with React Native and Node.js.

---

**Happy Coding! 🚀**
