# Achban-Lik Mobile App

Restaurant review mobile application built with React Native and Expo.

## Features

- User authentication (register/login)
- Browse restaurants with filters
- View restaurant details with reviews
- Add, edit, and delete reviews (one per restaurant)
- View all personal reviews
- Admin restaurant management (add/edit/delete)
- Real-time rating aggregation

## Tech Stack

- React Native & Expo
- Expo Router for navigation
- React Query for data fetching
- Zustand for state management
- Expo SecureStore for authentication
- Axios for API calls
- Expo Image Picker for uploads

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Configuration

Update the API base URL in `config/api.js`:

```javascript
// For physical device, use your computer's IP address
const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3000/api';

// For Android emulator
const API_BASE_URL = 'http://10.0.2.2:3000/api';

// For iOS simulator
const API_BASE_URL = 'http://localhost:3000/api';
```

## Screens

### Public Screens
- **Splash** - App intro with auto-redirect
- **Auth Choice** - Login or register selection
- **Login** - User login
- **Register** - New user registration

### Protected Screens (User)
- **Restaurants** - Browse all restaurants with city filters
- **Restaurant Details** - View restaurant info and reviews
- **Add Review** - Create a new review
- **Edit Review** - Modify existing review
- **My Reviews** - View all personal reviews

### Protected Screens (Admin)
- **Admin Restaurants** - Manage all restaurants
- **Add Restaurant** - Create new restaurant
- **Edit Restaurant** - Update restaurant details

## Project Structure

```
frontend/
├── app/                    # Expo Router screens
│   ├── _layout.jsx        # Root layout with auth guard
│   ├── index.jsx          # Splash screen
│   ├── auth-choice.jsx    # Auth selection
│   ├── login.jsx          # Login screen
│   ├── register.jsx       # Register screen
│   ├── restaurants.jsx    # Restaurant list
│   ├── restaurant-details.jsx
│   ├── add-review.jsx
│   ├── edit-review.jsx
│   ├── my-reviews.jsx
│   ├── admin-restaurants.jsx
│   └── add-restaurant.jsx
├── assets/                # Images and icons
├── config/                # Configuration files
│   └── api.js            # API client
├── store/                 # Zustand stores
│   └── authStore.js      # Authentication state
├── app.json              # Expo configuration
└── package.json
```

## User Credentials (From Seeded Data)

### Admin
- Email: `admin@achbanlik.com`
- Password: `admin123`

### Regular User
- Email: `ahmed@example.com`
- Password: `password123`

## Key Features Implementation

### Authentication
- JWT token storage with SecureStore
- Automatic route protection
- Session persistence
- Logout functionality

### State Management
- Zustand for auth state
- React Query for server state
- Automatic cache invalidation

### Navigation
- Expo Router file-based routing
- Protected routes with auth guard
- Deep linking support
- Stack navigation

### Data Fetching
- React Query for caching
- Automatic refetching
- Pull-to-refresh
- Optimistic updates

## Notes

- This is a training project for learning purposes
- Backend must be running before starting the mobile app
- Ensure proper network connectivity between device and backend
- Image uploads require expo-image-picker permissions

## Development Tips

1. **Testing on Physical Device**: Update API URL to your computer's local IP
2. **Testing Admin Features**: Login with admin credentials
3. **Debugging**: Use React Native Debugger or Expo DevTools
4. **Hot Reload**: Shake device or press 'r' in terminal

## Troubleshooting

### Cannot connect to backend
- Check that backend is running on port 3000
- Verify API_BASE_URL in config/api.js
- For Android emulator, use 10.0.2.2 instead of localhost

### Image uploads not working
- Grant camera/gallery permissions
- Check multer configuration on backend
- Verify file size limits

### Auth not persisting
- Check SecureStore functionality
- Verify token is being saved
- Clear app data and try again
